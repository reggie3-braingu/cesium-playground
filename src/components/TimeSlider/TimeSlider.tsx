import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";
import { differenceInSeconds, format, formatISO9075 } from "date-fns";
import { add } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { setElapsedSeconds } from "@src/redux/clockSlice";

type SliderMark = { value: number; label: string };

export interface TimeSliderProps {
  timeRange: [string, string] | null;
}

const TimeSlider = ({ timeRange }: TimeSliderProps) => {
  const dispatch = useDispatch();
  const { elapsedSeconds } = useSelector(
    (appState: RootState) => appState.clock
  );
  if (!timeRange) return null;

  const timeRangeDateArray: [Date, Date] = [
    new Date(timeRange?.[0]),
    new Date(timeRange?.[1]),
  ];
  const rangeInSeconds = differenceInSeconds(
    timeRangeDateArray[1],
    timeRangeDateArray[0]
  );

  const marks = getMarks(timeRangeDateArray, rangeInSeconds);
  const onChange = (
    _event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    const percentage = (value as number) / 100;
    const newElapsedSeconds = rangeInSeconds * percentage;
    console.log({ newElapsedSeconds });
    dispatch(setElapsedSeconds(Math.floor(newElapsedSeconds)));
  };

  if (!marks) return null;
  return (
    <Slider
      aria-label="Custom marks"
      value={(elapsedSeconds / rangeInSeconds) * 100}
      valueLabelFormat={(value) =>
        valuetext(value, rangeInSeconds, timeRangeDateArray[0])
      }
      valueLabelDisplay="auto"
      marks={marks}
      onChange={onChange}
      sx={{
        width: "100%",
        marginX: 8,
      }}
    />
  );
};

export default TimeSlider;

const SliderContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: "40px",
  backgroundColor: "cyan",
}));

function getMarks(timeRange: [Date, Date], rangeInSeconds: number) {
  if (!timeRange?.length) return null;
  // console.log({ timeRange });
  const NUMBER_OF_TIME_INCREMENTS = 10;
  const INCREMENT_VALUE = 100 / NUMBER_OF_TIME_INCREMENTS;
  const SECONDS_INCREMENT_VALUE = rangeInSeconds / NUMBER_OF_TIME_INCREMENTS;

  let marks: SliderMark[] = [];

  for (let i = 0; i <= NUMBER_OF_TIME_INCREMENTS; i++) {
    let markData: SliderMark;
    if (i === 0) {
      markData = { value: 0, label: timeRange[0].toISOString() };
    } else if (i === NUMBER_OF_TIME_INCREMENTS) {
      markData = {
        value: 100,
        label: timeRange[1].toISOString(),
      };
    } else {
      const label =
        i % 2 === 0
          ? add(timeRange[0], {
              seconds: SECONDS_INCREMENT_VALUE * i,
            })
              .toISOString()
              .split("T")[1]
          : "";
      markData = { value: INCREMENT_VALUE * i, label };
    }

    marks.push(markData);
  }

  return marks;
}

function valuetext(value: number, rangeInSeconds: number, startDateTime: Date) {
  // console.log({ value, rangeInSeconds });
  const percentage = value / 100;
  const newNumberOfSeconds = percentage * rangeInSeconds;
  //console.log({ percentage, newNumberOfSeconds });
  const zuluTime = add(startDateTime, {
    seconds: newNumberOfSeconds,
  })
    .toISOString()
    .split("T")[1];

  // console.log({ newDate });
  return zuluTime;
}
