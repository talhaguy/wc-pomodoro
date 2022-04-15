import { ReactiveController, ReactiveControllerHost } from "lit";
import { Timer, TimerActiveState, TimerOnEvent } from "timer";

export class TimerController implements ReactiveController {
  public seconds = 0;
  public activeState = TimerActiveState.inactive;
  public intervalsCompleted = 0;

  constructor(private _host: ReactiveControllerHost, private _timer: Timer) {
    this._host.addController(this);
  }

  hostConnected() {
    this._timer.on(TimerOnEvent.tick, this._onTick);
    this._timer.on(TimerOnEvent.complete, this._onTimerComplete);
    this._timer.on(TimerOnEvent.activeStateChange, this._onActiveStateChange);
  }

  hostDisconnected() {
    this._timer.off(TimerOnEvent.tick, this._onTick);
    this._timer.off(TimerOnEvent.complete, this._onTimerComplete);
    this._timer.off(TimerOnEvent.activeStateChange, this._onActiveStateChange);
  }

  private _onTick = (seconds: number) => {
    this.seconds = seconds;
    this._host.requestUpdate();
  };

  private _onTimerComplete = () => {
    this.seconds = 0;
    this.intervalsCompleted += 1;
    this._host.requestUpdate();
  };

  private _onActiveStateChange = (activeState: TimerActiveState) => {
    this.activeState = activeState;

    if (this.activeState === TimerActiveState.inactive) {
      this.seconds = 0;
    }

    this._host.requestUpdate();
  };
}

export function createReactiveTimerController(timer: Timer) {
  return (host: ReactiveControllerHost) => {
    return new TimerController(host, timer);
  };
}
