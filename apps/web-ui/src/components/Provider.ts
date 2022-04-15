import { customElement } from "lit/decorators";
import { BaseProvider } from "./BaseProvider";
import { createTimer } from "timer";
import { TIMER_TOKEN } from "../context/timer";
import { BODY_MODIFIER_TOKEN } from "../context/bodyModifier";
import { createBodyModifier } from "../services/BodyModifier";

@customElement("mt-provider")
export class Provider extends BaseProvider {
  public getContextValues(): Map<Symbol, unknown> {
    return new Map<Symbol, unknown>([
      [TIMER_TOKEN, createTimer()],
      [BODY_MODIFIER_TOKEN, createBodyModifier()],
    ]);
  }
}
