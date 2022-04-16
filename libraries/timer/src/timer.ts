import { EventHandler } from "./eventHandler";

export class Timer extends EventHandler<TimerOnEvent> {
  private _intervalId: number | null = null;
  private _seconds = 0;
  private _timerActiveState: TimerActiveState = TimerActiveState.inactive;

  constructor(private _timerFns: TimerFns) {
    super();
  }

  get seconds() {
    return this._seconds;
  }

  get timerActiveState() {
    return this._timerActiveState;
  }

  /**
   * @param until - length of timer in seconds
   */
  public start(until: number) {
    if (this._intervalId !== null) {
      console.warn("Timer is already running");
      return;
    }

    this._timerActiveState = TimerActiveState.active;
    this._runHandlers(TimerOnEvent.activeStateChange);

    this._intervalId = this._timerFns.setInterval(() => {
      this._seconds += 1;

      this._runHandlers(TimerOnEvent.tick);

      if (this._seconds >= until && this._intervalId !== null) {
        this._timerFns.clearInterval(this._intervalId);
        this._intervalId = null;
        this._seconds = 0;
        this._timerActiveState = TimerActiveState.inactive;
        this._runHandlers(TimerOnEvent.complete);
        this._runHandlers(TimerOnEvent.activeStateChange);
      }
    }, 1000);
  }

  public pause() {
    if (this._intervalId === null) {
      console.warn("Timer is not running");
      return;
    }

    this._timerFns.clearInterval(this._intervalId);
    this._intervalId = null;
    this._timerActiveState = TimerActiveState.paused;
    this._runHandlers(TimerOnEvent.activeStateChange);
  }

  public stop() {
    if (this._intervalId !== null) {
      this._timerFns.clearInterval(this._intervalId);
    }
    this._intervalId = null;
    this._seconds = 0;
    this._timerActiveState = TimerActiveState.inactive;
    this._runHandlers(TimerOnEvent.activeStateChange);
  }

  protected _runHandlers(event: TimerOnEvent) {
    this._eventHandlers.get(event)?.forEach((handler) => {
      switch (event) {
        case TimerOnEvent.tick:
          handler(this._seconds);
          break;
        case TimerOnEvent.complete:
          handler();
          break;
        case TimerOnEvent.activeStateChange:
          handler(this._timerActiveState);
          break;
        default:
          break;
      }
    });
  }
}

export enum TimerOnEvent {
  tick = "TICK",
  complete = "COMPLETE",
  activeStateChange = "ACTIVE_STATE_CHANGE",
}

export enum TimerActiveState {
  active = "ACTIVE",
  inactive = "INACTIVE",
  paused = "PAUSED",
}

export interface TimerFns {
  setInterval: Window["setInterval"];
  clearInterval: Window["clearInterval"];
}
