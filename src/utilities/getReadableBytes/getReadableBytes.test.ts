import { it, describe, expect } from "vitest";

import getReadableBytes from "./getReadableBytes";

describe("getReadableBytes test", () => {
  it("should run a test", () => {
    expect(getReadableBytes(2000000)).toMatchInlineSnapshot('"1.91 MB"');
    expect(getReadableBytes(104857600)).toMatchInlineSnapshot('"100 MB"');
    expect(getReadableBytes(1000000)).toMatchInlineSnapshot('"976.56 KB"');
    expect(getReadableBytes(200)).toMatchInlineSnapshot('"200 bytes"');
    expect(getReadableBytes(1)).toMatchInlineSnapshot('"1 byte"');
    expect(getReadableBytes(0)).toMatchInlineSnapshot('"0 bytes"');
  });
});
