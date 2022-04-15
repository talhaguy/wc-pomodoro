import { html, ReactiveControllerHost } from "lit";
import { customElement } from "lit/decorators";
import { BaseSmartComponent } from "./BaseSmartComponent";
import { TimerController } from "../controllers/TimerController";
import { TIMER_CONTROLLER } from "../context/timerController";

@customElement("mt-app")
export class App extends BaseSmartComponent {
  private _timerController!: TimerController;

  override connectedCallback(): void {
    super.connectedCallback();
    this._timerController =
      this.getContext<(r: ReactiveControllerHost) => TimerController>(
        TIMER_CONTROLLER
      )(this);
  }

  override render() {
    return html`
      <mt-layout intervalType="FOCUS">
        <mt-digital-clock
          slot="clock"
          seconds=${this._timerController.seconds}
        ></mt-digital-clock>
        <mt-controls
          slot="controls"
          activeState=${this._timerController.activeState}
        ></mt-controls>
        <mt-counter
          slot="counter"
          count=${this._timerController.intervalsCompleted}
        ></mt-counter>
      </mt-layout>
    `;
  }
}
