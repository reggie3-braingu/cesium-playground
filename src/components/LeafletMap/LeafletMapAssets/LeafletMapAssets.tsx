import { CzmlDataDictionary } from "@src/hooks/getCzmlFromFileData/getCzmlFromFileData";
import { EventTspiEntityRun } from "@src/index";
import { useMapEvents } from "react-leaflet";
import useLeafletMapAssets from "../hooks/useLeafletMapAssets/useLeafletMapAssets";

type LeafletMapAssetsProps = {
  entityRunData?: EventTspiEntityRun[];
  setCzmlData: (
    czmlData: CzmlDataDictionary,
    earliestEpochDateTime: Date | null,
    availabilityDateTimeRange: [Date, Date] | null
  ) => void;
};

const LeafletMapAssets = ({
  entityRunData,
  setCzmlData,
}: LeafletMapAssetsProps) => {
  useLeafletMapAssets({ entityRunData });

  return null;
};

export default LeafletMapAssets;
