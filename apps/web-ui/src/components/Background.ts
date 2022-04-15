import { html, css } from "lit";
import { customElement, property, query } from "lit/decorators";
import { BODY_MODIFIER_TOKEN } from "../context/body";
import { BodyModifier } from "../services/body";
import { BaseSmartComponent } from "./BaseSmartComponent";

@customElement("mt-background")
export class Background extends BaseSmartComponent {
  static override styles = css``;

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
    return html`<div>
      <slot></slot>
    </div>`;
  }
}
