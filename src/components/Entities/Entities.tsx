import { BASE_API_SERVER_URL } from "@src/globals";
import { useGetTspiEntityRunsByEventId } from "@src/hooks/useGetTspiEntityRunsByEventId";
import { EventTspiEntityRun } from "@src/index";
import React, { useMemo, useRef } from "react";
import {
  CesiumComponentRef,
  CzmlDataSource as ResiumCzmlDataSource,
} from "resium";
import { CzmlDataSource } from "cesium";
import noop from "lodash.noop";

interface EntitiesProps {
  eventId: string;
  onLoaded?: () => void;
}

const Entities = ({ eventId, onLoaded = noop }: EntitiesProps) => {
  const { entitiesCzml } = useGetTspiEntityRunsByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });

  console.log(JSON.stringify(entitiesCzml));

  const entityRunsRef = useRef<
    Record<string, CesiumComponentRef<CzmlDataSource> | null>
  >({});
  const validEntities = useMemo(
    () => entitiesCzml?.filter((entityRun) => !!entityRun.id),
    [entitiesCzml]
  );
  const loadedEntitiesCounter = useRef<number>(0);

  const onLoad = () => {
    loadedEntitiesCounter.current++;
    if (loadedEntitiesCounter.current === validEntities?.length) {
      console.log("entities loaded", entityRunsRef.current);
      onLoaded();
    }
  };

  if (!validEntities) return null;

  return (
    <>
      {validEntities?.map((entityRun: EventTspiEntityRun, index: number) => {
        return (
          <ResiumCzmlDataSource
            ref={(ref) => {
              entityRunsRef.current[entityRun.id!] = ref;
            }}
            key={`${entityRun.id}-${index}`}
            name={entityRun.tspientityrun?.entity?.id}
            data={entityRun.czml_url}
            onLoad={onLoad}
          />
        );
      })}
    </>
  );
};

export default Entities;
