import React, { useEffect, useState } from "react";
import ReactLeafletKml from "react-leaflet-kml";

interface LeafletMapDebugProps {
  isDebugEnabled: boolean;
}

const LeafletMapDebug = ({ isDebugEnabled }: LeafletMapDebugProps) => {
  const [kml, setKml] = useState<Document | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/aviklai/react-leaflet-kml/master/src/assets/example1.kml"
    )
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        console.log({ kml });
        setKml(kml);
      });
  }, []);
  return kml && isDebugEnabled ? <ReactLeafletKml kml={kml} /> : null;
};

export default LeafletMapDebug;
