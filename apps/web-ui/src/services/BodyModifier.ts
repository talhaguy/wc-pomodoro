export class BodyModifier {
  private _body = this._document.querySelector("body") as HTMLBodyElement;
  private _originalClasses = this._body.className;

  constructor(private _document: Document) {}

  public addClass(className: string) {
    this._body.className = this._originalClasses;
    this._body.classList.add(className);
  }

  public removeClass(className: string) {
    this._body.classList.remove(className);
  }
}

export function createBodyModifier(): BodyModifier {
  return new BodyModifier(document);
}
