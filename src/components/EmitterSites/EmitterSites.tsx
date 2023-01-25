import { BASE_API_SERVER_URL } from "@src/globals";
import { useGetEmitterSitesByEventId } from "@src/hooks/useGetEmitterSitesByEventId";
import { EventBoundary, EventEmitterSite } from "@src/index";
import React, { useEffect, useRef } from "react";
import {
  CesiumComponentRef,
  CzmlDataSource as ResiumCzmlDataSource,
  useCesium,
} from "resium";
import { CzmlDataSource } from "cesium";
import noop from "lodash.noop";
import { Viewer } from "cesium";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";

interface EmitterSitesProps {
  eventId: string;
  onLoaded?: () => void;
}

const EmitterSites = ({ eventId, onLoaded = noop }: EmitterSitesProps) => {
  const { viewer } = useCesium();
  const typedViewer = viewer as Viewer;

  const { emitterLabelsVisible } = useSelector(
    (appState: RootState) => appState.ui
  );

  const { emitterSites } = useGetEmitterSitesByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });
  const emitterSitesRef = useRef<
    Record<string, CesiumComponentRef<CzmlDataSource> | null>
  >({});
  const emitterSitesDataSourceRef = useRef<
    Record<string, CzmlDataSource | null>
  >({});
  const validEmitterSites = emitterSites?.filter((emitterSite) => {
    return !!emitterSite.id;
  });

  const loadedEntitiesCounter = useRef<number>(0);

  const onLoad = (czmlDataSource: CzmlDataSource, id: string) => {
    emitterSitesDataSourceRef.current[id] = czmlDataSource;
    loadedEntitiesCounter.current++;
    if (loadedEntitiesCounter.current === validEmitterSites?.length) {
      console.log(
        "*** loaded emitterSites",
        Object.keys(emitterSitesRef.current).length
      );
      onLoaded();

      Object.values(emitterSitesRef.current).forEach((emitterSite) => {
        viewer.data;
      });
    }
  };

  useEffect(() => {
    const dataSources = emitterSitesDataSourceRef.current;
    return () => {
      // TODO: remove items from map
      Object.values(dataSources)
        .filter((dataSource) => dataSource !== null)
        .forEach((dataSource) => {
          typedViewer.dataSources.remove(dataSource!);
        });
    };
  }, []);

  useEffect(() => {
    if (emitterSitesRef.current) {
      Object.entries(emitterSitesRef.current).forEach(([id, emitterSite]) => {
        if (!emitterSite?.cesiumElement) return;
        console.log("-----> ", id, emitterSite?.cesiumElement?.entities);
        try {
          // @ts-ignore "_" typically indicates something we shouldn't access, but I
          // haven't found another way to alter this value
          emitterSite.cesiumElement.entities._entities._array[0]._label._show._value =
            emitterLabelsVisible;
        } catch (error) {
          console.error("error");
          // @ts-ignore

          console.error(emitterSite.cesiumElement.entities._entities);
        }
      });
    }
  }, [emitterLabelsVisible]);

  if (!validEmitterSites) return null;

  console.count("EmitterSites");

  return (
    <>
      {validEmitterSites?.map(
        (emitterSite: EventEmitterSite, index: number) => {
          if (emitterSitesRef.current[emitterSite.id!]) return null;
          return (
            <ResiumCzmlDataSource
              ref={(ref) => {
                emitterSitesRef.current[emitterSite.id!] = ref;
              }}
              key={`${emitterSite.id}-${index}`}
              name={emitterSite.emittersites?.id}
              data={emitterSite.czml_url}
              onLoad={(czmlDataSource) => {
                onLoad(czmlDataSource, emitterSite.id!);
              }}
            />
          );
        }
      )}
    </>
  );
};

export default EmitterSites;
