import { customElement } from "lit/decorators";
import { BaseProvider } from "./BaseProvider";
import { createTimer } from "timer";

@customElement("mt-provider")
export class Provider extends BaseProvider {
  constructor() {
    super();

    this.addContext("Timer", createTimer());
  }
}
