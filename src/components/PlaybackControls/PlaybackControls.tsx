import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import useCzmlTimeDataStore from "@src/zustand/czmlTimeDataStore";
import React from "react";
import { useStopwatch } from "react-timer-hook";
import { TimeSlider } from "../TimeSlider";

type Props = {};

const PlaybackControls = (props: Props) => {
  const { earliestEpochDateTime, availabilityDateTimeRange } =
    useCzmlTimeDataStore();

  // const { seconds, pause, reset, start } = useStopwatch({ autoStart: true });

  //console.log({ seconds });

  return (
    <Paper
      variant="outlined"
      sx={{
        position: "absolute",
        bottom: 8,
        left: 8,
        right: 0,
        padding: 1,
        paddingTop: 2,
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        zIndex: 1000,
      }}
    >
      <TimeSlider timeRange={availabilityDateTimeRange} />
    </Paper>
  );
};

export default PlaybackControls;

const Container = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  width: 200,
  height: "100px",
  backgroundColor: "orange",
  display: "flex",
});
