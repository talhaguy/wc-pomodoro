import { removeItem } from "./util";

export class Timer {
  private _intervalId: number | null = null;
  private _seconds = 0;
  private _eventHandlers: Map<TimerOnEvent, Function[]> = new Map();
  private _timerActiveState: TimerActiveState = TimerActiveState.inactive;

  constructor(private _timerFns: TimerFns) {}

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

    this._intervalId = this._timerFns.setInterval(() => {
      this._seconds += 1;

      this._runHandlers(TimerOnEvent.tick);

      if (this._seconds >= until && this._intervalId !== null) {
        this._timerFns.clearInterval(this._intervalId);
        this._timerActiveState = TimerActiveState.inactive;
        this._runHandlers(TimerOnEvent.complete);
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
  }

  public stop() {
    if (this._intervalId === null) {
      console.warn("Timer is not running");
      return;
    }

    this._timerFns.clearInterval(this._intervalId);
    this._intervalId = null;
    this._seconds = 0;
    this._timerActiveState = TimerActiveState.inactive;
  }

  public on(event: TimerOnEvent, handler: Function) {
    if (!this._eventHandlers.has(event)) {
      this._eventHandlers.set(event, [handler]);
      return;
    }

    const handlers = this._eventHandlers.get(event);
    handlers?.push(handler);
  }

  public off(event: TimerOnEvent, handler: Function) {
    if (!this._eventHandlers.has(event)) {
      return;
    }

    const handlers = this._eventHandlers.get(event) as Function[];
    this._eventHandlers.set(event, removeItem(handlers, handler));
  }

  private _runHandlers(event: TimerOnEvent) {
    this._eventHandlers.get(event)?.forEach((handler) => {
      handler(this._seconds);
    });
  }
}

export enum TimerOnEvent {
  tick = "TICK",
  complete = "COMPLETE",
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
