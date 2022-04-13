import { LitElement, html } from "lit";
import { customElement } from "lit/decorators";
import playSvg from "../images/play_arrow_white_24dp.svg";
import pauseSvg from "../images/pause_white_24dp.svg";
import stopSvg from "../images/stop_white_24dp.svg";

@customElement("mt-app")
export class ActionButton extends LitElement {
  override render() {
    return html`
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
