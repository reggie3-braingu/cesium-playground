import React from "react";
import dynamic from "next/dynamic";
import { MapControls } from "@src/components/mapControls";
import { useMapSetup } from "@src/hooks/useMapSetup";
import { useStopwatch } from "react-timer-hook";

const LeafletMap = dynamic(
  () => import("../../components/LeafletMap/LeafletMap"),
  {
    ssr: false,
  }
);
const PlaybackControls = dynamic(
  () => import("../../components/PlaybackControls/PlaybackControls"),
  {
    ssr: false,
  }
);

const IndexLeafletMap = () => {
  const { eventId, runTimes, eventDateTimes, onRunSelect } = useMapSetup();

  return (
    <div style={{ border: "1px dashed yellow" }}>
      <LeafletMap
        eventId={eventId}
        runDateTimes={runTimes}
        eventDateTimes={eventDateTimes}
      />
      <MapControls onRunSelect={onRunSelect} eventId={eventId} />
      <PlaybackControls />
    </div>
  );
};

export default IndexLeafletMap;
