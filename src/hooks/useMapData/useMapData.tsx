import { JulianDate } from "cesium";

const USE_RUN_TIMES = true;

interface UseMapDataArgs {
  runDateTimes: [Date, Date] | null;
  eventDateTimes: [Date, Date] | null;
}
const useMapData = ({ runDateTimes, eventDateTimes }: UseMapDataArgs) => {
  if (!eventDateTimes || !runDateTimes)
    return { julianStart: null, julianStop: null };

  const julianStart = JulianDate.fromIso8601(
    USE_RUN_TIMES
      ? runDateTimes[0].toISOString()
      : eventDateTimes[0].toISOString()
  );
  const julianStop = JulianDate.fromIso8601(
    USE_RUN_TIMES
      ? runDateTimes[1].toISOString()
      : eventDateTimes[1].toISOString()
  );

  return { julianStart, julianStop };
};
export default useMapData;
