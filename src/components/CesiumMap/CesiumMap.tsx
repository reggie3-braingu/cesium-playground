import { useMapData } from "@src/hooks/useMapData";
import { JulianDate, ClockRange } from "cesium";
import React from "react";
import { Clock, Viewer } from "resium";
import { Boundaries } from "../Boundaries";
import { EmitterSites } from "../EmitterSites";
import { Entities } from "../Entities";
import { ViewerSetup } from "./ViewerSetup";

interface CesiumMapProps {
  eventId: string;
  runDateTimes: [Date, Date] | null;
  eventDateTimes: [Date, Date] | null;
}

const CesiumMap = ({
  eventId,
  eventDateTimes,
  runDateTimes,
}: CesiumMapProps) => {
  const { julianStart, julianStop } = useMapData({
    runDateTimes,
    eventDateTimes,
  });

  if (!julianStart || !julianStop) return null;

  return (
    <>
      <Viewer full>
        <Clock
          startTime={julianStart}
          stopTime={julianStop}
          clockRange={ClockRange.LOOP_STOP} // loop when we hit the end time
          // clockStep={ClockStep.SYSTEM_CLOCK_MULTIPLIER}
          multiplier={4000} // how much time to advance each tick
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

export default CesiumMap;
