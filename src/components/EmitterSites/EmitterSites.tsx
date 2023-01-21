import { BASE_API_SERVER_URL } from "@src/globals";
import { useGetEmitterSitesByEventId } from "@src/hooks/useGetEmitterSitesByEventId";
import { EventBoundary, EventEmitterSite } from "@src/index";
import React, { useRef } from "react";
import {
  CesiumComponentRef,
  CzmlDataSource as ResiumCzmlDataSource,
} from "resium";
import { CzmlDataSource } from "cesium";
import noop from "lodash.noop";

interface EmitterSitesProps {
  eventId: string;
  onLoaded?: () => void;
}

const EmitterSites = ({ eventId, onLoaded = noop }: EmitterSitesProps) => {
  const {
    emitterSites,
    isLoading: areEmitterSitesLoading,
    isError: areEmitterSitesError,
  } = useGetEmitterSitesByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });
  const emitterSitesRef = useRef<
    Record<string, CesiumComponentRef<CzmlDataSource> | null>
  >({});
  const validEmitterSites = emitterSites?.filter(
    (emitterSite) => !!emitterSite.id
  );

  const loadedEntitiesCounter = useRef<number>(0);

  const onLoad = () => {
    loadedEntitiesCounter.current++;
    if (loadedEntitiesCounter.current === validEmitterSites?.length) {
      console.log("emitterSites loaded", emitterSitesRef.current);
      onLoaded();
    }
  };

  if (!validEmitterSites) return null;

  return (
    <>
      {validEmitterSites?.map(
        (emitterSite: EventEmitterSite, index: number) => {
          return (
            <ResiumCzmlDataSource
              ref={(ref) => {
                emitterSitesRef.current[emitterSite.id!] = ref;
              }}
              key={`${emitterSite.id}-${index}`}
              name={emitterSite.emittersites?.id}
              data={emitterSite.czml_url}
              onLoad={onLoad}
            />
          );
        }
      )}
    </>
  );
};

export default EmitterSites;
