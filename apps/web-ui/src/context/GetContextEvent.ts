export class GetContextEvent extends CustomEvent<{
  token: string;
  value?: unknown;
}> {
  public static readonly EVENT_NAME = "get-context";

  constructor(private token: string, value: unknown = undefined) {
    super(GetContextEvent.EVENT_NAME, {
      detail: {
        token,
        value,
      },
      bubbles: true,
      composed: true,
    });
  }

  public getTokenValue<T>(): T {
    const value = this.detail.value;
    if (!value) {
      throw new Error("No value for token " + this.token);
    }
    return value as T;
  }
}
