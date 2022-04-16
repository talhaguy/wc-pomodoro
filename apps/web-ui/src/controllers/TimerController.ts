import { ReactiveController, ReactiveControllerHost } from "lit";
import { PomodoroTimer, PomodoroTimerOnEvent } from "timer";
import {
  DataStorage,
  DataStorageNotAvailableError,
  DataStorageSaveDataError,
  DataStorageInvalidSaveDataError,
  SavedData,
} from "../services/DataStorage";

export class TimerController implements ReactiveController {
  get seconds() {
    return this._pomodoroTimer.seconds;
  }

  get activeState() {
    return this._pomodoroTimer.activeState;
  }

  get intervalType() {
    return this._pomodoroTimer.intervalType;
  }

  get intervalsCompleted() {
    return this._pomodoroTimer.focusIntervalsCompleted;
  }

  private _errorCb: (msg: string) => void = () => {};
  private _errorStack: unknown[] = [];

  constructor(
    private _host: ReactiveControllerHost,
    private _pomodoroTimer: PomodoroTimer,
    private _dataStorage: DataStorage
  ) {
    this._host.addController(this);
  }

  hostConnected() {
    this._pomodoroTimer.on(PomodoroTimerOnEvent.tick, this._onTick);
    this._pomodoroTimer.on(
      PomodoroTimerOnEvent.intervalComplete,
      this._onIntervalComplete
    );
    this._pomodoroTimer.on(
      PomodoroTimerOnEvent.intervalSkip,
      this._onIntervalSkip
    );
    this._pomodoroTimer.on(
      PomodoroTimerOnEvent.activeStateChange,
      this._onActiveStateChange
    );

    let data: SavedData;
    try {
      data = this._dataStorage.load();
    } catch (err) {
      this._errorStack.push(err);
      return;
    }

    this._pomodoroTimer.focusIntervalsCompleted = data.numIntervalsCompleted;
    this._host.requestUpdate();
  }

  hostDisconnected() {
    this._pomodoroTimer.off(PomodoroTimerOnEvent.tick, this._onTick);
    this._pomodoroTimer.off(
      PomodoroTimerOnEvent.intervalComplete,
      this._onIntervalComplete
    );
    this._pomodoroTimer.off(
      PomodoroTimerOnEvent.intervalSkip,
      this._onIntervalSkip
    );
    this._pomodoroTimer.off(
      PomodoroTimerOnEvent.activeStateChange,
      this._onActiveStateChange
    );
  }

  public onError(cb: (msg: string) => void) {
    this._errorCb = cb;

    while (this._errorStack.length > 0) {
      this._handleError(this._errorStack.pop());
    }
  }

  private _onTick = () => {
    this._host.requestUpdate();
  };

  private _onIntervalComplete = () => {
    try {
      this._dataStorage.save({
        numIntervalsCompleted: this.intervalsCompleted,
      });
    } catch (err) {
      this._handleError(err);
    }

    this._host.requestUpdate();
  };

  private _onIntervalSkip = () => {
    this._host.requestUpdate();
  };

  private _onActiveStateChange = () => {
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
  pomodoroTimer: PomodoroTimer,
  dataStorage: DataStorage
) {
  return (host: ReactiveControllerHost) => {
    return new TimerController(host, pomodoroTimer, dataStorage);
  };
}
