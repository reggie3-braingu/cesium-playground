import { EVENT_IDS } from "@src/globals";
import React from "react";
import { Viewer } from "resium";
import { Boundaries } from "../Boundaries";
import { EmitterSites } from "../EmitterSites";
import { Entities } from "../Entities";

const Map = () => {
  return (
    <Viewer full>
      <Boundaries eventId={EVENT_IDS.OF_21_2} />
      <EmitterSites eventId={EVENT_IDS.OF_21_2} />
      <Entities eventId={EVENT_IDS.OF_21_2} />
    </Viewer>
  );
};

export default Map;
