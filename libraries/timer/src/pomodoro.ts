import { EventHandler } from "./eventHandler";
import { Timer, TimerOnEvent } from "./timer";

export class PomodoroTimer extends EventHandler<PomodoroTimerOnEvent> {
  private _intervalType: IntervalType = IntervalType.focus;
  private _intervalTypeSeconds: Map<IntervalType, number> = new Map([
    [IntervalType.focus, 5],
    [IntervalType.shortBreak, 2],
    [IntervalType.longBreak, 3]
  ]);
  private _focusIntervalsCompleted = 0;
  private readonly _numFocusIntervalsForLongBreak = 4;

  get seconds() {
    return this._timer.seconds;
  }

  get activeState() {
    return this._timer.timerActiveState;
  }

  get intervalType() {
    return this._intervalType;
  }

  get focusIntervalsCompleted() {
    return this._focusIntervalsCompleted;
  }

  set focusIntervalsCompleted(focusIntervalsCompleted: number) {
    this._focusIntervalsCompleted = focusIntervalsCompleted;
  }

  private _onTick = () => {
    this._runHandlers(PomodoroTimerOnEvent.tick);
  };

  private _onActiveStateChange = () => {
    this._runHandlers(PomodoroTimerOnEvent.activeStateChange);
  };

  private _onTimerComplete = () => {
    if (this._intervalType === IntervalType.focus) {
      this._focusIntervalsCompleted += 1;
    }

    this._intervalType = getNextInterval(
      this.intervalType,
      this.focusIntervalsCompleted,
      this._numFocusIntervalsForLongBreak
    );

    this._runHandlers(PomodoroTimerOnEvent.intervalComplete);
  };

  constructor(private _timer: Timer) {
    super();
    this._timer.on(TimerOnEvent.tick, this._onTick);
    this._timer.on(TimerOnEvent.activeStateChange, this._onActiveStateChange);
    this._timer.on(TimerOnEvent.complete, this._onTimerComplete);
  }

  public start() {
    const until = this._intervalTypeSeconds.get(this._intervalType) as number;
    this._timer.start(until);
  }

  public stop() {
    this._timer.stop();
  }

  public skip() {
    this._intervalType = getNextInterval(
      this.intervalType,
      this.focusIntervalsCompleted,
      this._numFocusIntervalsForLongBreak
    );
    this._timer.stop();
    this._runHandlers(PomodoroTimerOnEvent.intervalSkip);
  }

  public pause() {
    this._timer.pause();
  }

  protected _runHandlers(event: PomodoroTimerOnEvent) {
    this._eventHandlers.get(event)?.forEach((handler) => {
      switch (event) {
        case PomodoroTimerOnEvent.tick:
          handler(this._timer.seconds);
          break;
        case PomodoroTimerOnEvent.intervalComplete:
          handler(this._intervalType);
          break;
        case PomodoroTimerOnEvent.intervalSkip:
          handler(this._intervalType);
          break;
        case PomodoroTimerOnEvent.activeStateChange:
          handler(this._timer.timerActiveState);
          break;
        default:
          break;
      }
    });
  }

  public destructor() {
    this._timer.off(TimerOnEvent.tick, this._onTick);
    this._timer.off(TimerOnEvent.activeStateChange, this._onActiveStateChange);
    this._timer.off(TimerOnEvent.complete, this._onTimerComplete);
  }
}

export enum IntervalType {
  focus = "FOCUS",
  shortBreak = "SHORT_BREAK",
  longBreak = "LONG_BREAK"
}

export enum PomodoroTimerOnEvent {
  tick = "TICK",
  intervalComplete = "INTERVAL_COMPLETE",
  intervalSkip = "INTERVAL_SKIP",
  activeStateChange = "ACTIVE_STATE_CHANGE"
}

export function getNextInterval(
  currentIntervalType: IntervalType,
  focusIntervalsCompleted: number,
  numFocusIntervalsForLongBreak: number
): IntervalType {
  if (currentIntervalType === IntervalType.focus) {
    if (focusIntervalsCompleted === numFocusIntervalsForLongBreak) {
      return IntervalType.longBreak;
    } else {
      return IntervalType.shortBreak;
    }
  } else {
    return IntervalType.focus;
  }
}
