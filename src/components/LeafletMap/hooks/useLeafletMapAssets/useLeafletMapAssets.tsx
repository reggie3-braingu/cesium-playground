import getCzmlFromFileData, {
  CzmlDataDictionary,
} from "@src/hooks/getCzmlFromFileData/getCzmlFromFileData";
import { useGetFilesByUrls } from "@src/hooks/useGetFilesByUrls";
import { EventTspiEntityRun } from "@src/index";
import {
  setAvailabilityDateTimeRange,
  setEarliestEpochDateTime,
} from "@src/redux/czmlTimeDataSlice";
import { RootState } from "@src/redux/store";
import L from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useStopwatch } from "react-timer-hook";
import { getPositionFromCartographicDegrees } from "./getPositionFromCartographicDegrees";

type UseLeafletMapAssetsArgs = {
  entityRunData?: EventTspiEntityRun[];
};

const useLeafletMapAssets = ({
  entityRunData: assets = [],
}: UseLeafletMapAssetsArgs) => {
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
  const markerDictionaryRef = useRef<Record<string, L.Marker>>({});
  const [areMarkersInitialized, setAreMarkersInitialized] =
    useState<boolean>(false);

  const { emitterLabelsVisible } = useSelector(
    (appState: RootState) => appState.ui
  );

  const dispatch = useDispatch();

  const leafletMap = useMap();

  useMapEvents({
    load() {
      setTimeout(() => {
        leafletMap.invalidateSize();
      }, 0);
    },
  });

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

  // console.log({ czmlData });

  useEffect(() => {
    if (earliestEpochDateTime) {
      dispatch(setEarliestEpochDateTime(earliestEpochDateTime.toISOString()));
    }
    if (availabilityDateTimeRange) {
      dispatch(
        setAvailabilityDateTimeRange([
          availabilityDateTimeRange[0].toISOString(),
          availabilityDateTimeRange[1].toISOString(),
        ])
      );
    }
  }, [czmlData, earliestEpochDateTime, availabilityDateTimeRange, dispatch]);

  // useEffect(() => {
  //   if (areMarkersInitialized && !isRunning) {
  //     // startStopWatch();
  //   }

  //   return () => {
  //     pauseStopWatch();
  //   };
  // }, [areMarkersInitialized, isRunning, pauseStopWatch]);

  useEffect(() => {
    if (czmlData) {
      Object.entries(czmlData).forEach(([id, data]) => {
        const position = getPositionFromCartographicDegrees(
          seconds,
          data.czml.position.cartographicDegrees
        );

        const marker = L.marker([position.lat, position.lng]).addTo(leafletMap);
        markerDictionaryRef.current[id] = marker;
      });
      setAreMarkersInitialized(true);
    }
  }, [czmlData, leafletMap, seconds]);
};

export default useLeafletMapAssets;
