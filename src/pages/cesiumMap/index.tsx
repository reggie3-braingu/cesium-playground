import React from "react";
import dynamic from "next/dynamic";
import { MapControls } from "@src/components/mapControls";
import { useMapSetup } from "@src/hooks/useMapSetup";

const CesiumMap = dynamic(
  () => import("../../components/CesiumMap/CesiumMap"),
  {
    ssr: false,
  }
);

const IndexCesiumMap = () => {
  const { eventId, runTimes, eventDateTimes, onRunSelect } = useMapSetup();
  return (
    <>
      <CesiumMap
        eventId={eventId}
        runDateTimes={runTimes}
        eventDateTimes={eventDateTimes}
      />
      <MapControls onRunSelect={onRunSelect} eventId={eventId} />
    </>
  );
};

export default IndexCesiumMap;
