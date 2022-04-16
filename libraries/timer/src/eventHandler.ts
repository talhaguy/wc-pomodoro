import { removeItem } from "./util";

export abstract class EventHandler<OnEvent> {
  protected _eventHandlers: Map<OnEvent, Function[]> = new Map();

  public on(event: OnEvent, handler: Function) {
    if (!this._eventHandlers.has(event)) {
      this._eventHandlers.set(event, [handler]);
      return;
    }

    const handlers = this._eventHandlers.get(event);
    handlers?.push(handler);
  }

  public off(event: OnEvent, handler: Function) {
    if (!this._eventHandlers.has(event)) {
      return;
    }

    const handlers = this._eventHandlers.get(event) as Function[];
    this._eventHandlers.set(event, removeItem(handlers, handler));
  }

  protected abstract _runHandlers(event: OnEvent): void;
}
