import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators";

@customElement("mt-action-button")
export class ActionButton extends LitElement {
  @property({ type: Boolean })
  disabled = false;

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    .btn {
      border: 1px solid black;
      background-color: white;
      padding: 20px;
      cursor: pointer;
    }
  `;

  override render() {
    return html`
      <button class="btn" ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}
