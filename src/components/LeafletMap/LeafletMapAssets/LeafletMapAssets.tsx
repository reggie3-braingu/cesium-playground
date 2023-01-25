import getCzmlFromFileData, {
  CzmlDataDictionary,
} from "@src/hooks/getCzmlFromFileData/getCzmlFromFileData";
import { useGetFilesByUrls } from "@src/hooks/useGetFilesByUrls";
import { EventTspiEntityRun } from "@src/index";
import useCzmlTimeDataStore from "@src/zustand/czmlTimeDataStore";
import React, { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { useStopwatch } from "react-timer-hook";
import { getPositionFromCartographicDegrees } from "./getPositionFromCartographicDegrees";

type LeafletMapAssetsProps = {
  entityRunData?: EventTspiEntityRun[];
  setCzmlData: (
    czmlData: CzmlDataDictionary,
    earliestEpochDateTime: Date | null,
    availabilityDateTimeRange: [Date, Date] | null
  ) => void;
};

const LeafletMapAssets = ({
  entityRunData: assets = [],
  setCzmlData,
}: LeafletMapAssetsProps) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start: startStopWatch,
    pause: pauseStopWatch,
    reset,
  } = useStopwatch({ autoStart: false });

  const fileDataObjects = useGetFilesByUrls({
    urlConfigs:
      assets
        ?.filter((asset) => !!asset?.czml_url && !!asset.id)
        .map((asset) => {
          return { url: asset.czml_url!, itemId: asset.id! };
        }) || [],
  });

  const { czmlData, earliestEpochDateTime, availabilityDateTimeRange } =
    getCzmlFromFileData({
      fileDataObjects: fileDataObjects,
    });

  // const czmlData = null,
  //   earliestEpochDateTime = null,
  //   availabilityDateTimeRange = null;
  // useEffect(() => {
  //   setCzmlData(czmlData, earliestEpochDateTime, availabilityDateTimeRange);
  // }, [czmlData, earliestEpochDateTime, availabilityDateTimeRange]);

  useEffect(() => {
    if (czmlData && !isRunning) {
      // startStopWatch();
    }

    return () => {
      pauseStopWatch();
    };
  }, [czmlData]);

  if (!czmlData) return null;

  return (
    <>
      {Object.entries(czmlData).map(([id, data]) => {
        const position = getPositionFromCartographicDegrees(
          seconds,
          data.czml.position.cartographicDegrees
        );
        return (
          <Marker key={id} position={position}>
            <Popup>You are here</Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default LeafletMapAssets;
