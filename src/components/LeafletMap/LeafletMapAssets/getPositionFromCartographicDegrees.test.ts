import { it, describe, expect } from "vitest";

import cartographicDegrees from "../../../../dataSamples/cartographicDegrees.json";
import { getPositionFromCartographicDegrees } from "./getPositionFromCartographicDegrees";

describe("getPositionFromCartographicDegrees tests", () => {
  it("should correctly retrieve position data", () => {
    expect(getPositionFromCartographicDegrees(0, cartographicDegrees)).toEqual({
      lat: cartographicDegrees[2],
      lng: cartographicDegrees[1],
    });

    expect(getPositionFromCartographicDegrees(1, cartographicDegrees)).toEqual({
      lat: cartographicDegrees[6],
      lng: cartographicDegrees[5],
    });

    expect(getPositionFromCartographicDegrees(2, cartographicDegrees)).toEqual({
      lat: cartographicDegrees[10],
      lng: cartographicDegrees[9],
    });
  });
});
