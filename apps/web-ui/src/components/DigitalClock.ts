import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators";

@customElement("mt-digital-clock")
export class DigitalClock extends LitElement {
  static override styles = css`
    p {
      font-size: 2rem;
      margin: 0;
    }
  `;

  @property({ type: Number })
  public seconds = 0;

  override render() {
    return html` <p>${this.seconds}</p> `;
  }
}
