import { Czml } from "@src/index";
import React, { useEffect, useRef, useState } from "react";
import { min, max } from "date-fns";
import _ from "lodash";

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
      if (!object.data || object.isLoading) return;

      const documentDefinition = object.data.fileText[0];
      const czml = object.data.fileText[1];
      czmlData[object.data.itemId] = { documentDefinition, czml };
    });

    if (!!Object.keys(czmlData).length) {
      earliestEpochDateTime = getEarliestEpochDateTime(czmlData);
      availabilityDateTimeRange = getAvailibilityRange(czmlData);
    }
  }

  // console.log({ availabilityDateTimeRange });
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

  // console.log({ endAvailabilities });
  return [min(startAvailabilities), max(endAvailabilities)];
};
