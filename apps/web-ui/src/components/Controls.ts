import { html } from "lit";
import { customElement, property } from "lit/decorators";
import { Timer, TimerActiveState } from "timer";
import { BaseSmartComponent } from "./BaseSmartComponent";
import { TIMER_TOKEN } from "../context/timer";
import playSvg from "../images/play_arrow_white_24dp.svg";
import pauseSvg from "../images/pause_white_24dp.svg";
import stopSvg from "../images/stop_white_24dp.svg";

@customElement("mt-controls")
export class Controls extends BaseSmartComponent {
  private _timer!: Timer;

  @property({ type: String })
  public activeState: TimerActiveState = TimerActiveState.inactive;

  override connectedCallback(): void {
    super.connectedCallback();

    this._timer = this.getContext(TIMER_TOKEN);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  override render() {
    return html`
      <mt-action-button
        label="Play"
        imgUrl=${playSvg}
        ?disabled=${this.activeState === TimerActiveState.active}
        @action-button-click=${() => {
          this._timer.start(5);
        }}
      ></mt-action-button>
      <mt-action-button
        label="Pause"
        imgUrl=${pauseSvg}
        ?disabled=${this.activeState === TimerActiveState.inactive ||
        this.activeState === TimerActiveState.paused}
        @action-button-click=${() => {
          this._timer.pause();
        }}
      ></mt-action-button>
      <mt-action-button
        label="Stop"
        imgUrl=${stopSvg}
        ?disabled=${this.activeState === TimerActiveState.inactive}
        @action-button-click=${() => {
          this._timer.stop();
        }}
      ></mt-action-button>
    `;
  }
}
