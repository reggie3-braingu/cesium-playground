import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect } from "react";
import { BASE_API_SERVER_URL } from "@src/globals";
import { useGetEventBoundariesByEventId } from "@src/hooks/useGetEventBoundariesByEventId";
import { LeafletMapBoundaries } from "./LeafletMapBoundaries";
import { useGetTspiEntityRunsByEventId } from "@src/hooks/useGetTspiEntityRunsByEventId";
import { LeafletMapAssets } from "./LeafletMapAssets";

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

  //console.log({ entityRunData });

  return (
    <MapContainer
      center={[35.7882157380178, -115.61195423532774]}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[35.7882157380178, -115.61195423532774]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <LeafletMapBoundaries boundaries={boundaries} />
      <LeafletMapAssets entityRunData={entityRunData} />
    </MapContainer>
  );
};

export default LeafletMap;
