import { BASE_API_SERVER_URL, EVENT_IDS } from "@src/globals";
import { useGetTestRunsByEventId } from "@src/hooks/useGetTestRunsByEventId";
import { JulianDate, ClockRange, ClockStep } from "cesium";
import React from "react";
import { Clock, Viewer } from "resium";
import { Boundaries } from "../Boundaries";
import { EmitterSites } from "../EmitterSites";
import { Entities } from "../Entities";
import { useCesium } from "resium";
import { ViewerSetup } from "./ViewerSetup";

interface MapProps {
  eventId: string;
  runDateTimes: [Date, Date] | null;
  eventDateTimes: [Date, Date] | null;
}

const USE_RUN_TIMES = true;
const Map = ({ eventId, eventDateTimes, runDateTimes }: MapProps) => {
  if (!eventDateTimes || !runDateTimes) return null;

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

  return (
    <>
      <Viewer full>
        <Clock
          startTime={julianStart}
          stopTime={julianStop}
          clockRange={ClockRange.LOOP_STOP} // loop when we hit the end time
          // clockStep={ClockStep.SYSTEM_CLOCK_MULTIPLIER}
          // multiplier={4000} // how much time to advance each tick
          // shouldAnimate // Animation on by default
          currentTime={julianStart}
        />
        <Boundaries eventId={eventId} />
        <EmitterSites eventId={eventId} />
        <Entities eventId={eventId} />
        <ViewerSetup julianStart={julianStart} julianStop={julianStop} />
      </Viewer>
    </>
  );
};

export default Map;
