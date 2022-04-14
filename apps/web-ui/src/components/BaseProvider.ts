import { LitElement, html } from "lit";
import { GetContextEvent } from "../context/GetContextEvent";

export class BaseProvider extends LitElement {
  // TODO: use symbol instead of string
  private _dependencies: Record<string, unknown> = {};
  private _didAddContextListener = false;

  constructor() {
    super();

    this.addEventListener(GetContextEvent.EVENT_NAME, (e) =>
      this._handleGetContext(e as GetContextEvent)
    );
    this._didAddContextListener = true;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this._didAddContextListener) {
      this.addEventListener(GetContextEvent.EVENT_NAME, (e) =>
        this._handleGetContext(e as GetContextEvent)
      );
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(GetContextEvent.EVENT_NAME, (e) =>
      this._handleGetContext(e as GetContextEvent)
    );
    this._didAddContextListener = false;
  }

  public override render() {
    return html`<slot></slot>`;
  }

  public addContext(token: string, value: unknown) {
    this._dependencies[token] = value;
  }

  public removeContext(token: string) {
    delete this._dependencies[token];
  }

  private _handleGetContext = (event: GetContextEvent) => {
    const { token } = event.detail;
    const value = this._dependencies[token];
    if (!value) {
      console.warn("No value for token: ", token);
      return;
    }
    event.detail.value = value;
  };
}
