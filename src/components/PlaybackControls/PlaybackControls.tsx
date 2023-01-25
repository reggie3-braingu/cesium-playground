import { IconButton, Paper } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { TimeSlider } from "../TimeSlider";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ReplayIcon from "@mui/icons-material/Replay";
import { RootState } from "@src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementElapsedSeconds,
  setElapsedSeconds,
} from "@src/redux/clockSlice";

type Props = {};

type ClockStates = "running" | "paused";

const PlaybackControls = (props: Props) => {
  const { earliestEpochDateTime, availabilityDateTimeRange } = useSelector(
    (appState: RootState) => appState.czmlTimeData
  );
  const [currentClockState, setCurrentClockState] =
    useState<ClockStates>("paused");

  // const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
  //   useStopwatch({ autoStart: false });

  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentClockState === "running") {
        dispatch(incrementElapsedSeconds());
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, currentClockState]);

  const onClickReset = () => {
    dispatch(setElapsedSeconds(0));
    setCurrentClockState("paused");
  };

  const onClickPause = () => {
    setCurrentClockState("paused");
  };

  const onClickPlay = () => {
    setCurrentClockState("running");
  };

  console.log({ currentClockState });
  return (
    <Container variant="outlined">
      {currentClockState === "paused" ? (
        <IconButton aria-label="play" onClick={onClickPlay} size="large">
          <PlayCircleIcon fontSize="large" />
        </IconButton>
      ) : (
        <IconButton aria-label="pause" onClick={onClickPause} size="large">
          <PauseCircleIcon fontSize="large" />
        </IconButton>
      )}
      <IconButton aria-label="reset" onClick={onClickReset} size="large">
        <ReplayIcon fontSize="large" />
      </IconButton>
      <TimeSlider timeRange={availabilityDateTimeRange} />
    </Container>
  );
};

export default PlaybackControls;

const Container = styled(Paper)({
  position: "absolute",
  bottom: 24,
  left: 36,
  right: 36,
  padding: 1,
  paddingTop: 2,
  height: "100px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  zIndex: 1000,
  flexDirection: "row",
});
