import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators";
import { Timer } from "timer";
import { GetContextEvent } from "../context/GetContextEvent";
import playSvg from "../images/play_arrow_white_24dp.svg";
import pauseSvg from "../images/pause_white_24dp.svg";
import stopSvg from "../images/stop_white_24dp.svg";

@customElement("mt-app")
export class App extends LitElement {
  @state()
  private _seconds = 0;

  private _timer!: Timer;

  constructor() {
    super();

    const ctxEvent = new GetContextEvent("Timer");
    this.dispatchEvent(ctxEvent);
    this._timer = ctxEvent.getTokenValue<Timer>();
    console.log("timer", this._timer);
  }

  override render() {
    return html`
      <mt-digital-clock seconds=${this._seconds}></mt-digital-clock>

      <mt-action-button
        label="Play"
        imgUrl=${playSvg}
        @click=${() => console.log("play click")}
      ></mt-action-button>
      <mt-action-button
        label="Pause"
        imgUrl=${pauseSvg}
        @click=${() => console.log("pause click")}
      ></mt-action-button>
      <mt-action-button
        label="Stop"
        imgUrl=${stopSvg}
        @click=${() => console.log("stop click")}
      ></mt-action-button>
    `;
  }
}
