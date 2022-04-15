import { html, css } from "lit";
import { customElement, property } from "lit/decorators";
import { BODY_MODIFIER_TOKEN } from "../context/body";
import { BodyModifier } from "../services/body";
import { BaseSmartComponent } from "./BaseSmartComponent";

@customElement("mt-layout")
export class Layout extends BaseSmartComponent {
  static override styles = css`
    .layout {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .slot {
      display: flex;
      justify-content: center;
    }

    .slot + .slot {
      margin-top: 30px;
    }
  `;

  @property({ type: String })
  public intervalType: string = "";

  private _bodyModifier!: BodyModifier;

  override connectedCallback(): void {
    super.connectedCallback();

    this._bodyModifier = this.getContext(BODY_MODIFIER_TOKEN);
  }

  protected override willUpdate(
    changedProperties: Map<PropertyKey, unknown>
  ): void {
    if (
      changedProperties.has("intervalType") &&
      this.intervalType === "FOCUS"
    ) {
      this._bodyModifier.addClass("focus-bg");
    }
  }

  override render() {
    return html`<div class="layout">
      <div>
        <div class="slot">
          <slot name="clock"></slot>
        </div>
        <div class="slot">
          <slot name="controls"></slot>
        </div>
        <div class="slot">
          <slot name="counter"></slot>
        </div>
      </div>
    </div>`;
  }
}
