import { ReactiveController, ReactiveControllerHost } from "lit";
import { Timer, TimerActiveState, TimerOnEvent } from "timer";
import {
  DataStorage,
  DataStorageNotAvailableError,
  DataStorageSaveDataError,
  DataStorageInvalidSaveDataError,
  SavedData,
} from "../services/DataStorage";

export class TimerController implements ReactiveController {
  public seconds = 0;
  public activeState = TimerActiveState.inactive;
  public intervalsCompleted = 0;

  private _errorCb: (msg: string) => void = () => {};
  private _errorStack: unknown[] = [];

  constructor(
    private _host: ReactiveControllerHost,
    private _timer: Timer,
    private _dataStorage: DataStorage
  ) {
    this._host.addController(this);
  }

  hostConnected() {
    this._timer.on(TimerOnEvent.tick, this._onTick);
    this._timer.on(TimerOnEvent.complete, this._onTimerComplete);
    this._timer.on(TimerOnEvent.activeStateChange, this._onActiveStateChange);

    let data: SavedData;
    try {
      data = this._dataStorage.load();
    } catch (err) {
      this._errorStack.push(err);
      return;
    }

    this.intervalsCompleted = data.numIntervalsCompleted;
    this._host.requestUpdate();
  }

  hostDisconnected() {
    this._timer.off(TimerOnEvent.tick, this._onTick);
    this._timer.off(TimerOnEvent.complete, this._onTimerComplete);
    this._timer.off(TimerOnEvent.activeStateChange, this._onActiveStateChange);
  }

  public onError(cb: (msg: string) => void) {
    this._errorCb = cb;

    while (this._errorStack.length > 0) {
      this._handleError(this._errorStack.pop());
    }
  }

  private _onTick = (seconds: number) => {
    this.seconds = seconds;
    this._host.requestUpdate();
  };

  private _onTimerComplete = () => {
    this.seconds = 0;
    this.intervalsCompleted += 1;

    try {
      this._dataStorage.save({
        numIntervalsCompleted: this.intervalsCompleted,
      });
    } catch (err) {
      this._handleError(err);
    }

    this._host.requestUpdate();
  };

  private _onActiveStateChange = (activeState: TimerActiveState) => {
    this.activeState = activeState;

    if (this.activeState === TimerActiveState.inactive) {
      this.seconds = 0;
    }

    this._host.requestUpdate();
  };

  private _handleError(err: unknown) {
    if (err instanceof DataStorageNotAvailableError) {
      this._errorCb(
        "Your browser does not support local storage or it is full."
      );
    } else if (err instanceof DataStorageSaveDataError) {
      this._errorCb("Your save data could not be saved.");
    } else if (err instanceof DataStorageInvalidSaveDataError) {
      this._errorCb("Your save data has been corrupted.");
    } else {
      this._errorCb("An unknown error occurred.");
    }
  }
}

export function createReactiveTimerController(
  timer: Timer,
  dataStorage: DataStorage
) {
  return (host: ReactiveControllerHost) => {
    return new TimerController(host, timer, dataStorage);
  };
}
