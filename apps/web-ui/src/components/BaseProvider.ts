import { LitElement, html } from "lit";
import { GetContextEvent } from "../context/GetContextEvent";

export abstract class BaseProvider extends LitElement {
  private _dependencies: Map<Symbol, unknown> = this.getContextValues();

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener(GetContextEvent.EVENT_NAME, (e) => this._handleGetContext(e as GetContextEvent));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(GetContextEvent.EVENT_NAME, (e) => this._handleGetContext(e as GetContextEvent));
  }

  public override render() {
    return html`<slot></slot>`;
  }

  private _handleGetContext = (event: GetContextEvent) => {
    const { token } = event.detail;
    const value = this._dependencies.get(token);
    if (!value) {
      throw new Error("No value for token " + token.toString());
    }
    event.detail.value = value;
  };

  public abstract getContextValues(): Map<Symbol, unknown>;
}
