import { JulianDate } from "cesium";
import React from "react";
import { useCesium } from "resium";

type ViewerSetupProps = {
  julianStart: JulianDate;
  julianStop: JulianDate;
};

const ViewerSetup = ({ julianStart, julianStop }: ViewerSetupProps) => {
  const { viewer } = useCesium();

  console.log("--- setting up  ---", { julianStart }, { julianStop });
  if (viewer) {
    viewer.timeline.zoomTo(julianStart, julianStop);
  }

  return null;
};

export default ViewerSetup;
