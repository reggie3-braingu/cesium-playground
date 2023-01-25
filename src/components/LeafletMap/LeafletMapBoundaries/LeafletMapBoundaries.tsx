import { useGetFilesByUrls } from "@src/hooks/useGetFilesByUrls";
import { GetFilesResponse } from "@src/hooks/useGetFilesByUrls/useGetFilesByUrls";
import { EventBoundary } from "@src/index";
import React from "react";
import ReactLeafletKml from "react-leaflet-kml"; // react-leaflet-kml must be loaded AFTER react-leaflet

type LeafletMapBoundariesProps = {
  boundaries?: EventBoundary[];
};

const LeafletMapBoundaries = ({
  boundaries = [],
}: LeafletMapBoundariesProps) => {
  const fileDataObjects = useGetFilesByUrls({
    urlConfigs:
      boundaries
        ?.filter((boundary) => !!boundary?.kml_url && !!boundary.id)
        .map((boundary) => {
          return { url: boundary.kml_url!, itemId: boundary.id! };
        }) || [],
  });

  if (!fileDataObjects) return null;

  return (
    <>
      {fileDataObjects.map(({ data: kmlFileData }) => {
        if (!kmlFileData) return null;

        const kmlText = kmlFileData.fileText;
        const parser = new DOMParser();
        const parsedKmlText = parser.parseFromString(kmlText, "text/xml");
        return <ReactLeafletKml key={kmlFileData.itemId} kml={parsedKmlText} />;
      })}
    </>
  );
};

export default LeafletMapBoundaries;
