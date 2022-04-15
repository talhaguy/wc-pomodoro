import { customElement } from "lit/decorators";
import { BaseProvider } from "./BaseProvider";
import { createTimer } from "timer";
import { TIMER_TOKEN } from "../context/timer";
import { BODY_MODIFIER_TOKEN } from "../context/body";
import { createBodyModifier } from "../services/body";

@customElement("mt-provider")
export class Provider extends BaseProvider {
  public getContextValues(): Map<Symbol, unknown> {
    return new Map<Symbol, unknown>([
      [TIMER_TOKEN, createTimer()],
      [BODY_MODIFIER_TOKEN, createBodyModifier()],
    ]);
  }
}
