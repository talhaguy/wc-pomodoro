import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators";
import { ifDefined } from "lit/directives/if-defined";
import { SHARED_COMPONENT_STYLES } from "../style/component";

@customElement("mt-action-button")
export class ActionButton extends LitElement {
  @property({ type: Boolean })
  public disabled = false;

  @property({ type: String })
  public label = "";

  @property({ type: String })
  public imgUrl?: string;

  static override styles = [
    SHARED_COMPONENT_STYLES,
    css`
      .btn {
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: var(--color-orange);
        color: var(--color-white);
        padding: 0;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 2px;
        filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25));
      }

      .btn:disabled {
        opacity: 0.7;
      }

      img {
        width: 32px;
        height: 32px;
      }
    `,
  ];

  override render() {
    return html`
      <button
        class="btn"
        ?disabled=${this.disabled}
        aria-label=${this.label}
        @click=${() => {
          this.dispatchEvent(new ActionButtonClickEvent());
        }}
      >
        <img src="${ifDefined(this.imgUrl)}" />
      </button>
    `;
  }
}

export class ActionButtonClickEvent extends Event {
  public static EVENT_NAME = "action-button-click";

  constructor() {
    super(ActionButtonClickEvent.EVENT_NAME, {
      bubbles: true,
      composed: true,
    });
  }
}
