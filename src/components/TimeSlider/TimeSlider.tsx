import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";
import { differenceInSeconds } from "date-fns";

type SliderMarks = { value: number; label: string }[];

export interface TimeSliderProps {
  timeRange: [string, string] | null;
}

const TimeSlider = ({ timeRange }: TimeSliderProps) => {
  if (!timeRange) return null;

  const timeRangeDateArray: [Date, Date] = [
    new Date(timeRange?.[0]),
    new Date(timeRange?.[1]),
  ];
  const rangeInSeconds = differenceInSeconds(
    timeRangeDateArray[0],
    timeRangeDateArray[1]
  );

  const marks = getMarks(timeRangeDateArray, rangeInSeconds);

  if (!marks) return null;
  return (
    <Slider
      aria-label="Custom marks"
      defaultValue={20}
      getAriaValueText={valuetext}
      step={10}
      valueLabelDisplay="auto"
      marks={marks}
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
  const TIME_PERCENTAGES = 10;

  let marks: SliderMarks = [
    {
      value: 0,
      label: timeRange[0].toISOString(),
    },
  ];

  return marks;
}

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}
