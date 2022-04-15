import { LitElement } from "lit";
import { GetContextEvent } from "../context/GetContextEvent";

export class BaseSmartComponent extends LitElement {
  public getContext<T>(token: Symbol): T {
    const event = new GetContextEvent(token);
    this.dispatchEvent(event);
    return event.detail.value as T;
  }
}
