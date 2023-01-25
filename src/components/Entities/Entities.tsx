import { BASE_API_SERVER_URL } from "@src/globals";
import { useGetTspiEntityRunsByEventId } from "@src/hooks/useGetTspiEntityRunsByEventId";
import { EventTspiEntityRun } from "@src/index";
import React, { useEffect, useMemo, useRef } from "react";
import {
  CesiumComponentRef,
  CzmlDataSource as ResiumCzmlDataSource,
} from "resium";
import { CzmlDataSource } from "cesium";
import noop from "lodash.noop";
import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";

interface EntitiesProps {
  eventId: string;
  onLoaded?: () => void;
}

const Entities = ({ eventId, onLoaded = noop }: EntitiesProps) => {
  const { assetLabelsVisible } = useSelector(
    (appState: RootState) => appState.ui
  );

  const { entityRunData } = useGetTspiEntityRunsByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });

  const entityRunsRef = useRef<
    Record<string, CesiumComponentRef<CzmlDataSource> | null>
  >({});
  const validEntities = useMemo(
    () => entityRunData?.filter((entityRun) => !!entityRun.id),
    [entityRunData]
  );
  const loadedEntitiesCounter = useRef<number>(0);

  const onLoad = () => {
    loadedEntitiesCounter.current++;
    if (loadedEntitiesCounter.current === validEntities?.length) {
      console.log("entities loaded", entityRunsRef.current);
      onLoaded();
    }
  };

  useEffect(() => {
    if (entityRunsRef.current) {
      Object.entries(entityRunsRef.current).forEach(([id, emitterSite]) => {
        if (!emitterSite?.cesiumElement) return;
        console.log("++++> ", id, emitterSite?.cesiumElement?.entities);
        try {
          // @ts-ignore
          emitterSite.cesiumElement.entities._entities._array[0]._label._show._value =
            assetLabelsVisible;
          // emitterSite.cesiumElement.entities._entities._array[0]._label;
        } catch (error) {
          console.error("error");
          // @ts-ignore
          console.error(emitterSite.cesiumElement.entities._entities);
        }
      });
    }
  }, [assetLabelsVisible]);

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
