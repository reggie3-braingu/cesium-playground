import { FormControlLabel, Paper, Switch } from "@mui/material";
import useUiStore from "@src/zustand/uiStore";
import React from "react";
import { RunSelect } from "../RunSelect";

type MapControlsProps = {
  eventId: string;
  onRunSelect: (id: string) => void;
};

const MapControls = ({ eventId, onRunSelect }: MapControlsProps) => {
  const {
    emitterLabelsVisible,
    toggleEmitterLabelsVisible,
    assetLabelsVisible,
    toggleAssetLabelsVisible,
  } = useUiStore();

  return (
    <Paper
      variant="outlined"
      sx={{
        position: "absolute",
        top: 8,
        left: 8,
        width: 250,
        padding: 1,
        paddingTop: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        zIndex: 1000,
      }}
    >
      <RunSelect onRunSelect={onRunSelect} eventId={eventId} />
      <FormControlLabel
        control={
          <Switch
            checked={emitterLabelsVisible}
            onChange={toggleEmitterLabelsVisible}
          />
        }
        label="Show Emitter Labels"
      />
      <FormControlLabel
        control={
          <Switch
            checked={assetLabelsVisible}
            onChange={toggleAssetLabelsVisible}
          />
        }
        label="Show Asset Labels"
      />
    </Paper>
  );
};

export default MapControls;
