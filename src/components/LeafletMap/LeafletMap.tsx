import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React from "react";
import { BASE_API_SERVER_URL } from "@src/globals";
import { useGetEventBoundariesByEventId } from "@src/hooks/useGetEventBoundariesByEventId";
import { LeafletMapBoundaries } from "./LeafletMapBoundaries";
import { useGetTspiEntityRunsByEventId } from "@src/hooks/useGetTspiEntityRunsByEventId";
import { LeafletMapDebug } from "./LeafletMapDebug";
import { CzmlDataDictionary } from "@src/hooks/getCzmlFromFileData/getCzmlFromFileData";
import { LeafletMapAssets } from "./LeafletMapAssets";

import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  eventId: string;
  runDateTimes: [Date, Date] | null;
  eventDateTimes: [Date, Date] | null;
}

const LeafletMap = ({ eventId }: LeafletMapProps) => {
  const { boundaries } = useGetEventBoundariesByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });

  const { entityRunData } = useGetTspiEntityRunsByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });

  const setCzmlData = (
    czmlData: CzmlDataDictionary,
    earliestEpochDateTime: Date | null,
    availabilityDateTimeRange: [Date, Date] | null
  ) => {};

  // console.count("LeafletMap");
  return (
    <MapContainer
      center={[35.7882157380178, -115.61195423532774]}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100vw" }}
      data-testid="leaflet-map"
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[35.7882157380178, -115.61195423532774]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <LeafletMapBoundaries boundaries={boundaries} />
      <LeafletMapDebug isDebugEnabled />
      <LeafletMapAssets
        entityRunData={entityRunData}
        setCzmlData={setCzmlData}
      />
    </MapContainer>
  );
};

export default LeafletMap;
