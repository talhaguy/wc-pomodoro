import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators";
import { SHARED_COMPONENT_STYLES } from "../style/component";

@customElement("mt-counter")
export class Counter extends LitElement {
  static override styles = [
    SHARED_COMPONENT_STYLES,
    css`
      ul {
        padding: 0;
        list-style-type: none;
        margin: 0;
        display: flex;
        min-height: 15px;
      }

      li {
        width: 15px;
        height: 15px;
        background-color: var(--color-white);
        border-radius: 100%;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
      }

      li + li {
        margin-left: 5px;
      }
    `
  ];

  @property({ type: Number })
  public count = 0;

  override render() {
    return html`
      <ul>
        ${this._renderCounterItems()}
      </ul>
    `;
  }

  private _renderCounterItems() {
    const items = [];
    for (let i = this.count; i > 0; i--) {
      items.push(html`<li></li>`);
    }
    return items;
  }
}
