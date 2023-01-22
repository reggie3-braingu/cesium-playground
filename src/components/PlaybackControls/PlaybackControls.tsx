import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useStopwatch } from "react-timer-hook";

type Props = {};

const PlaybackControls = (props: Props) => {
  // const { seconds, pause, reset, start } = useStopwatch({ autoStart: true });

  //console.log({ seconds });

  return (
    <Paper
      variant="outlined"
      sx={{
        position: "absolute",
        bottom: 8,
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
      PlaybackControls
    </Paper>
  );
};

export default PlaybackControls;

const Container = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
  zIndex: 100,
  width: 200,
  height: 60,
  backgroundColor: "orange",
});
