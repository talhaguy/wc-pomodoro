import { customElement } from "lit/decorators";
import { BaseProvider } from "./BaseProvider";
import { createTimer } from "timer";
import { TIMER_TOKEN } from "../context/timer";
import { BODY_MODIFIER_TOKEN } from "../context/bodyModifier";
import { createBodyModifier } from "../services/BodyModifier";
import { TIMER_CONTROLLER } from "../context/timerController";
import { createReactiveTimerController } from "../controllers/TimerController";

@customElement("mt-provider")
export class Provider extends BaseProvider {
  public getContextValues(): Map<Symbol, unknown> {
    const timer = createTimer();

    return new Map<Symbol, unknown>([
      [TIMER_TOKEN, timer],
      [BODY_MODIFIER_TOKEN, createBodyModifier()],
      [TIMER_CONTROLLER, createReactiveTimerController(timer)],
    ]);
  }
}
