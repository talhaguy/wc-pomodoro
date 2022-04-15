import { html, ReactiveControllerHost } from "lit";
import { customElement, state } from "lit/decorators";
import { createRef, ref } from "lit/directives/ref";
import { BaseSmartComponent } from "./BaseSmartComponent";
import { TimerController } from "../controllers/TimerController";
import { TIMER_CONTROLLER } from "../context/timerController";
import { AlertMessage } from "./AlertMessage";

@customElement("mt-app")
export class App extends BaseSmartComponent {
  @state()
  private _errorMessage = "";

  @state()
  private _alertType: "info" | "error" | "success" = "error";

  private _timerController!: TimerController;

  private _alertRef = createRef<AlertMessage>();

  override connectedCallback(): void {
    super.connectedCallback();

    this._timerController =
      this.getContext<(r: ReactiveControllerHost) => TimerController>(
        TIMER_CONTROLLER
      )(this);
  }

  protected override firstUpdated(): void {
    this._timerController.onError((msg) => {
      this._errorMessage = msg;
      this._alertType = "error";
      this._alertRef.value?.show();
    });
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

      <mt-alert-message
        type=${this._alertType}
        disappearMs=${5000}
        message=${this._errorMessage}
        ${ref(this._alertRef)}
      ></mt-alert-message>
    `;
  }
}
