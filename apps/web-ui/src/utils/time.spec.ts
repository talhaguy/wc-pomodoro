import { expect } from "chai";
import { formatSeconds } from "./time";

describe("formatSeconds", () => {
  it("should format seconds into clock format", () => {
    expect(formatSeconds(5)).to.equal("00:05");
    expect(formatSeconds(23)).to.equal("00:23");
    expect(formatSeconds(100)).to.equal("01:40");
    expect(formatSeconds(1463)).to.equal("24:23");
  });
});
