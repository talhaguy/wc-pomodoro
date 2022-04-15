import { customElement } from "lit/decorators";
import { BaseProvider } from "./BaseProvider";
import { createTimer } from "timer";
import { TIMER_TOKEN } from "../context/timer";

@customElement("mt-provider")
export class Provider extends BaseProvider {
  public getContextValues(): Map<Symbol, unknown> {
    return new Map([[TIMER_TOKEN, createTimer()]]);
  }
}
