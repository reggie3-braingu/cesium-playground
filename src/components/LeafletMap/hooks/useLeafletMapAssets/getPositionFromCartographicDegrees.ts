export const getPositionFromCartographicDegrees = (
  timeSecond: number,
  positions: number[]
) => {
  /*
  1 =  0, 1, 2, 3
  2 =  4, 5, 6, 7
  */
  const startPoint = timeSecond * 4;
  const slice = positions.slice(startPoint, startPoint + 4);

  return { lat: slice[2], lng: slice[1] };
};
