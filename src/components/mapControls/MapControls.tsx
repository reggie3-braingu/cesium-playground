import { FormControlLabel, Paper, Switch } from "@mui/material";
import { RootState } from "@src/redux/store";
import {
  toggleAssetLabelsVisible,
  toggleEmitterLabelsVisible,
} from "@src/redux/uiSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RunSelect } from "../RunSelect";

type MapControlsProps = {
  eventId: string;
  onRunSelect: (id: string) => void;
};

const MapControls = ({ eventId, onRunSelect }: MapControlsProps) => {
  const { assetLabelsVisible, emitterLabelsVisible } = useSelector(
    (appState: RootState) => appState.ui
  );

  const dispatch = useDispatch();

  const onToggleEmitterLabels = () => {
    dispatch(toggleEmitterLabelsVisible);
  };
  const onToggleAssetLabels = () => {
    dispatch(toggleAssetLabelsVisible);
  };

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
            onChange={onToggleEmitterLabels}
          />
        }
        label="Show Emitter Labels"
      />
      <FormControlLabel
        control={
          <Switch checked={assetLabelsVisible} onChange={onToggleAssetLabels} />
        }
        label="Show Asset Labels"
      />
    </Paper>
  );
};

export default MapControls;
