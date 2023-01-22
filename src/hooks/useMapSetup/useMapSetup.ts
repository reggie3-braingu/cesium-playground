import { BASE_API_SERVER_URL, EVENT_IDS } from "@src/globals";
import React, { useState } from "react";
import { useGetEventById } from "../useGetEventById";
import { useGetTestRunsByEventId } from "../useGetTestRunsByEventId";

const eventId = EVENT_IDS.OF_21_2;

const useMapSetup = () => {
  const { event } = useGetEventById({ eventId, rootUrl: BASE_API_SERVER_URL });

  const eventDateTimes =
    event?.start_date_time && event?.end_date_time
      ? ([new Date(event.start_date_time), new Date(event?.end_date_time)] as [
          Date,
          Date
        ])
      : null;

  const [runTimes, setRunTimes] = useState<[Date, Date] | null>(null);

  const {
    testRuns,
    isLoading: areTestRunsLoading,
    isError: areTestRunsError,
  } = useGetTestRunsByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });

  const onRunSelect = (id: string) => {
    const selectedTestRun = testRuns?.find((run) => run.id === id);
    console.log({ selectedTestRun });
    if (selectedTestRun) {
      const { start_date_time, end_date_time } = selectedTestRun;
      setRunTimes([new Date(start_date_time), new Date(end_date_time)]);
    }
  };

  return {
    eventId,
    runTimes,
    eventDateTimes,
    onRunSelect,
  };
};

export default useMapSetup;
