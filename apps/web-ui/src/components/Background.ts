import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators";
import { classMap } from "lit/directives/class-map";

@customElement("mt-background")
export class Background extends LitElement {
  static override styles = css`
    .background {
      width: 100vw;
      height: 100vh;
    }

    .focus {
      background-color: var(--color-blue);
    }
  `;

  @property({ type: String })
  public intervalType: string = "";

  override render() {
    return html`<div
      class="${classMap({
        background: true,
        focus: this.intervalType === "FOCUS",
      })}"
    >
      <slot></slot>
    </div>`;
  }
}
