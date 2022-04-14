import { LitElement, html } from "lit";
import { customElement } from "lit/decorators";

@customElement("mt-root")
export class App extends LitElement {
  override render() {
    return html`
      <mt-provider>
        <mt-app></mt-app>
      </mt-provider>
    `;
  }
}
