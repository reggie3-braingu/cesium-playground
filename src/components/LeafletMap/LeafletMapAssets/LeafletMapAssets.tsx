import { useGetFilesByUrls } from "@src/hooks/useGetFilesByUrls";
import { EventTspiEntityRun } from "@src/index";
import React from "react";
import ReactLeafletKml from "react-leaflet-kml"; // react-leaflet-kml must be loaded AFTER react-leaflet

type LeafletMapAssetsProps = {
  entityRunData?: EventTspiEntityRun[];
};

const LeafletMapAssets = ({
  entityRunData: assets = [],
}: LeafletMapAssetsProps) => {
  const fileDataObjects = useGetFilesByUrls({
    urlConfigs:
      assets
        ?.filter((asset) => !!asset?.czml_url && !!asset.id)
        .map((asset) => {
          return { url: asset.czml_url!, itemId: asset.id! };
        }) || [],
  });

  if (!fileDataObjects) return null;

  return (
    <>
      {fileDataObjects.map(({ data: czmlFileData }) => {
        if (!czmlFileData) return null;

        // console.log({ czmlFileData });

        const kmlText = czmlFileData.fileText;
        const parser = new DOMParser();
        const parsedKmlText = parser.parseFromString(kmlText, "text/xml");

        return (
          <ReactLeafletKml key={czmlFileData.itemId} kml={parsedKmlText} />
        );
      })}
    </>
  );
};

export default LeafletMapAssets;
