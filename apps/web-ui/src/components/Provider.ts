import { customElement } from "lit/decorators";
import { BaseProvider } from "./BaseProvider";
import { createTimer } from "timer";
import { TIMER_TOKEN } from "../context/timer";
import { BODY_MODIFIER_TOKEN } from "../context/bodyModifier";
import { createBodyModifier } from "../services/BodyModifier";
import { TIMER_CONTROLLER } from "../context/timerController";
import { createReactiveTimerController } from "../controllers/TimerController";
import { DATA_STORAGE_TOKEN } from "../context/dataStorage";
import { DataStorage } from "../services/DataStorage";

@customElement("mt-provider")
export class Provider extends BaseProvider {
  public getContextValues(): Map<Symbol, unknown> {
    const timer = createTimer();
    const dataStorage = new DataStorage(window.localStorage);

    return new Map<Symbol, unknown>([
      [TIMER_TOKEN, timer],
      [BODY_MODIFIER_TOKEN, createBodyModifier()],
      [DATA_STORAGE_TOKEN, dataStorage],
      [TIMER_CONTROLLER, createReactiveTimerController(timer, dataStorage)],
    ]);
  }
}
