import { html } from "lit";
import { customElement, state } from "lit/decorators";
import { Timer, TimerActiveState, TimerOnEvent } from "timer";
import { BaseSmartComponent } from "./BaseSmartComponent";
import { TIMER_TOKEN } from "../context/timer";

@customElement("mt-app")
export class App extends BaseSmartComponent {
  @state()
  private _seconds = 0;

  @state()
  private _activeState = TimerActiveState.inactive;

  private _timer!: Timer;

  private _onTick = (seconds: number) => {
    this._seconds = seconds;
  };

  private _onTimerComplete = () => {
    this._seconds = 0;
  };

  private _onActiveStateChange = (activeState: TimerActiveState) => {
    this._activeState = activeState;

    if (this._activeState === TimerActiveState.inactive) {
      this._seconds = 0;
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this._timer = this.getContext(TIMER_TOKEN);
    this._timer.on(TimerOnEvent.tick, this._onTick);
    this._timer.on(TimerOnEvent.complete, this._onTimerComplete);
    this._timer.on(TimerOnEvent.activeStateChange, this._onActiveStateChange);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._timer.off(TimerOnEvent.tick, this._onTick);
    this._timer.off(TimerOnEvent.complete, this._onTimerComplete);
    this._timer.off(TimerOnEvent.activeStateChange, this._onActiveStateChange);
  }

  override render() {
    return html`
      <mt-background intervalType="FOCUS">
        <mt-digital-clock seconds=${this._seconds}></mt-digital-clock>
        <mt-controls activeState=${this._activeState}></mt-controls>
        <mt-counter count=${3}></mt-counter>
      </mt-background>
    `;
  }
}
