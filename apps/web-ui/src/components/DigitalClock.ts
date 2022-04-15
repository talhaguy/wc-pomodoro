import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators";
import { formatSeconds } from "../utils/time";

@customElement("mt-digital-clock")
export class DigitalClock extends LitElement {
  static override styles = css`
    p {
      font-size: 7.2rem;
      margin: 0;
    }
  `;

  @property({ type: Number })
  public seconds = 0;

  override render() {
    return html` <p>${formatSeconds(this.seconds)}</p> `;
  }
}
