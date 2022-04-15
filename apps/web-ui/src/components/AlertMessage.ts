import { html, css } from "lit";
import { customElement, property, state } from "lit/decorators";
import { classMap } from "lit/directives/class-map";
import { BaseSmartComponent } from "./BaseSmartComponent";

@customElement("mt-alert-message")
export class AlertMessage extends BaseSmartComponent {
  static override styles = css`
    .message {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 20px;
      border-radius: 5px;
      color: var(--color-white);
      margin: 0;
    }

    .info {
      background-color: var(--color-gray);
      color: var(--color-black);
    }

    .error {
      background-color: var(--color-red);
    }

    .success {
      background-color: var(--color-green);
    }
  `;

  @property({ type: String })
  public type: "info" | "error" | "success" = "info";

  @property({ type: String })
  public message = "";

  @property({ type: Number })
  public disappearMs = 5000;

  @state()
  private _isVisible = false;

  private _timeoutId: number | undefined;

  override connectedCallback(): void {
    super.connectedCallback();
    console.log("AlertMessage connectedCallback");
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._timeoutId);
  }

  override render() {
    return html`${this._isVisible
      ? html`<p
          class=${classMap({
            message: true,
            info: this.type === "info",
            error: this.type === "error",
            success: this.type === "success",
          })}
        >
          ${this.message}
        </p> `
      : null}`;
  }

  public show() {
    if (this._isVisible) {
      return;
    }

    this._isVisible = true;

    this._timeoutId = window.setTimeout(() => {
      //   this._isVisible = false;
      this._timeoutId = undefined;
    }, this.disappearMs);
  }

  public hide() {
    window.clearTimeout(this._timeoutId);
    this._timeoutId = undefined;
  }
}
