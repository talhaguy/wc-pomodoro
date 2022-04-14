import { expect } from "chai";
import { removeItem } from "./util";

describe("removeItem", () => {
  it("should item from array", () => {
    let arr = [1, 2, 3, 4, 5];

    let result = removeItem(arr, 3);
    expect(result).to.deep.equal([1, 2, 4, 5]);

    result = removeItem(arr, 100);
    expect(result).to.deep.equal([1, 2, 3, 4, 5]);
  });
});
