export class GetContextEvent extends CustomEvent<{
  token: Symbol;
  value?: unknown;
}> {
  public static readonly EVENT_NAME = "get-context";

  constructor(token: Symbol) {
    super(GetContextEvent.EVENT_NAME, {
      detail: {
        token
      },
      bubbles: true,
      composed: true
    });
  }
}
