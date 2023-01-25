import { Czml } from "@src/index";
import React, { useEffect, useRef, useState } from "react";
import { min } from "date-fns";
import _ from "lodash";
import useCzmlTimeDataStore from "@src/zustand/czmlTimeDataStore";

export interface CzmlDataItem {
  documentDefinition: { id: string; version: string };
  czml: Czml;
}

export type CzmlDataDictionary = Record<string, CzmlDataItem>;

interface UseGetCzmlFromFileDataArgs {
  fileDataObjects: unknown[];
}

const getCzmlFromFileData = ({
  fileDataObjects = [],
}: UseGetCzmlFromFileDataArgs) => {
  let czmlData: CzmlDataDictionary = {};
  let earliestEpochDateTime: Date | null = null;
  let availabilityDateTimeRange: [Date, Date] | null = null;

  if (fileDataObjects?.length) {
    fileDataObjects.forEach((object) => {
      if (!object.data) return;

      const documentDefinition = object.data.fileText[0];
      const czml = object.data.fileText[1];
      czmlData[object.data.itemId] = { documentDefinition, czml };
    });

    earliestEpochDateTime = getEarliestEpochDateTime(czmlData);
    availabilityDateTimeRange = getAvailibilityRange(czmlData);
  }

  //   console.log(
  //     "availabilityDateTimeRange.current",
  //     availabilityDateTimeRange.current
  //   );

  return {
    czmlData,
    earliestEpochDateTime,
    availabilityDateTimeRange,
  };
};

export default getCzmlFromFileData;

const getEarliestEpochDateTime = (
  CzmlDataDictionary: CzmlDataDictionary
): Date => {
  const dates = Object.values(CzmlDataDictionary).map(
    (item) => new Date(item.czml.position.epoch)
  );

  const earliest = min(dates);

  return earliest;
};

const getAvailibilityRange = (
  czmlDataDictionary: CzmlDataDictionary
): [Date, Date] => {
  let startAvailabilities: Date[] = [],
    endAvailabilities: Date[] = [];

  Object.values(czmlDataDictionary).forEach((item) => {
    const availabilities = item.czml.availability.split("/");
    startAvailabilities.push(new Date(availabilities[0]));
    endAvailabilities.push(new Date(availabilities[1]));
  });
  return [min(startAvailabilities), min(endAvailabilities)];
};
