import getCzmlFromFileData, {
  CzmlDataDictionary,
} from "@src/hooks/getCzmlFromFileData/getCzmlFromFileData";
import { useGetFilesByUrls } from "@src/hooks/useGetFilesByUrls";
import { Czml, EventTspiEntityRun } from "@src/index";
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
import "leaflet.marker.slideto";

type UseLeafletMapAssetsArgs = {
  entityRunData?: EventTspiEntityRun[];
};

const useLeafletMapAssets = ({
  entityRunData: assets = [],
}: UseLeafletMapAssetsArgs) => {
  const markerDictionaryRef = useRef<Record<string, L.Marker>>({});
  const markerCzmlDictionaryRef = useRef<Record<string, Czml>>({});
  const [areMarkersInitialized, setAreMarkersInitialized] =
    useState<boolean>(false);
  const { elapsedSeconds } = useSelector(
    (appState: RootState) => appState.clock
  );

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

  useEffect(() => {
    // console.log({ assets, czmlData });
    // console.log("czmlData length", Object.keys(czmlData).length);
    // console.log(
    //   "Object.keys(czmlData).length >= assets.length",
    //   Object.keys(czmlData).length >= assets.length
    // );

    if (
      assets.length &&
      Object.keys(czmlData).length >= assets.length &&
      !areMarkersInitialized
    ) {
      console.log("--- Initializing Markers ---");
      // remove any current markers
      Object.entries(markerDictionaryRef.current).forEach(
        ([id, leafletMarker]) => {
          leafletMarker.remove();
        }
      );

      markerDictionaryRef.current = {};
      markerCzmlDictionaryRef.current = {};
      Object.entries(czmlData).forEach(([id, data]) => {
        const position = getPositionFromCartographicDegrees(
          elapsedSeconds,
          data.czml.position.cartographicDegrees
        );
        // console.log({ position });
        let marker = {} as L.Marker;
        if (position) {
          marker = L.marker([position.lat, position.lng]).addTo(leafletMap);
        }
        markerDictionaryRef.current[id] = marker;
        markerCzmlDictionaryRef.current[id] = data.czml;
      });
      setAreMarkersInitialized(true);
    }
  }, [
    areMarkersInitialized,
    czmlData,
    leafletMap,
    elapsedSeconds,
    assets.length,
    assets,
  ]);

  useEffect(() => {
    if (areMarkersInitialized) {
      // console.log("*** moving markers ***");
      Object.entries(markerDictionaryRef.current).forEach(
        ([id, leafletMarker]) => {
          const newPosition = getPositionFromCartographicDegrees(
            elapsedSeconds,
            markerCzmlDictionaryRef.current[id].position.cartographicDegrees
          );
          if (newPosition) {
            // leafletMarker.setLatLng(newPosition);
            leafletMarker.slideTo([newPosition.lat, newPosition.lng], {
              // duration: 2000,
              keepAtCenter: false,
            });
          }
        }
      );
    }
  }, [areMarkersInitialized, elapsedSeconds]);
};

export default useLeafletMapAssets;
