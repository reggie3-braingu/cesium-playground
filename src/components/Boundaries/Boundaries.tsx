import { BASE_API_SERVER_URL } from "@src/globals";
import { useGetEventBoundariesByEventId } from "@src/hooks/useGetEventBoundariesByEventId";
import { EventBoundary } from "@src/index";
import React, { useMemo, useRef } from "react";
import {
  CesiumComponentRef,
  KmlDataSource as ResiumKmlDataSource,
} from "resium";
import { KmlDataSource } from "cesium";
import noop from "lodash.noop";
interface BoundariesProps {
  eventId: string;
  onLoaded?: () => void;
}

const Boundaries = ({ eventId, onLoaded = noop }: BoundariesProps) => {
  const {
    boundaries,
    isLoading: areBoundariesLoading,
    isError: areBoundariesError,
  } = useGetEventBoundariesByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });
  const boundariesRef = useRef<
    Record<string, CesiumComponentRef<KmlDataSource> | null>
  >({});

  const validBoundaries = useMemo(
    () => boundaries?.filter((airspace) => !!airspace.boundary?.id),
    [boundaries]
  );
  const loadedBoundariesCounter = useRef<number>(0);

  const onLoad = () => {
    loadedBoundariesCounter.current++;
    if (loadedBoundariesCounter.current === validBoundaries?.length) {
      console.log("boundaries loaded", boundariesRef.current);
      onLoaded();
    }
  };

  if (!validBoundaries) return null;

  return (
    <>
      {validBoundaries?.map((airspace: EventBoundary, index: number) => {
        return (
          <ResiumKmlDataSource
            key={`${airspace.boundary?.id}-${index}`}
            ref={(ref) => {
              boundariesRef.current[airspace.id!] = ref;
            }}
            name={airspace.boundary?.id}
            sourceUri={airspace.boundary?.id}
            data={airspace.kml_url}
            onLoad={onLoad}
          />
        );
      })}
    </>
  );
};

export default Boundaries;
