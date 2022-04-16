import { html } from "lit";
import { customElement, property } from "lit/decorators";
import { PomodoroTimer, TimerActiveState } from "timer";
import { BaseSmartComponent } from "./BaseSmartComponent";
import { POMODORO_TIMER_TOKEN } from "../context/pomodoroTimer";
import playSvg from "../images/play_arrow_white_24dp.svg";
import pauseSvg from "../images/pause_white_24dp.svg";
import restartSvg from "../images/replay_white_24dp.svg";
import skipSvg from "../images/skip_next_white_24dp.svg";

@customElement("mt-controls")
export class Controls extends BaseSmartComponent {
  private _pomodoroTimer!: PomodoroTimer;

  @property({ type: String })
  public activeState: TimerActiveState = TimerActiveState.inactive;

  override connectedCallback(): void {
    super.connectedCallback();

    this._pomodoroTimer = this.getContext(POMODORO_TIMER_TOKEN);
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
          this._pomodoroTimer.start();
        }}
      ></mt-action-button>
      <mt-action-button
        label="Pause"
        imgUrl=${pauseSvg}
        ?disabled=${this.activeState === TimerActiveState.inactive ||
        this.activeState === TimerActiveState.paused}
        @action-button-click=${() => {
          this._pomodoroTimer.pause();
        }}
      ></mt-action-button>
      <mt-action-button
        label="Restart"
        imgUrl=${restartSvg}
        ?disabled=${this.activeState === TimerActiveState.inactive}
        @action-button-click=${() => {
          this._pomodoroTimer.stop();
        }}
      ></mt-action-button>
      <mt-action-button
        label="Skip"
        imgUrl=${skipSvg}
        @action-button-click=${() => {
          this._pomodoroTimer.skip();
        }}
      ></mt-action-button>
    `;
  }
}
