import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators";
import { IntervalType } from "timer";
import { SHARED_COMPONENT_STYLES } from "../style/component";

@customElement("mt-interval-label")
export class Counter extends LitElement {
  static override styles = [
    SHARED_COMPONENT_STYLES,
    css`
      p {
        margin: 0;
        font-size: 1.8rem;
        text-transform: uppercase;
      }
    `
  ];

  @property({ type: String })
  public intervalType: IntervalType = IntervalType.focus;

  override render() {
    return html` <p>${getFocusIntervalLabel(this.intervalType)}</p> `;
  }
}

function getFocusIntervalLabel(type: IntervalType): string {
  switch (type) {
    case IntervalType.focus:
      return "Focus";
    case IntervalType.shortBreak:
      return "Short Break";
    case IntervalType.longBreak:
      return "Long Break";
    default:
      return "";
  }
}
