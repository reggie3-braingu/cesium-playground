import Head from "next/head";
import dynamic from "next/dynamic";
import { RunSelect } from "@src/components/RunSelect";
import { BASE_API_SERVER_URL, EVENT_IDS } from "@src/globals";
import { useState } from "react";
import { Paper } from "@mui/material";
import { useGetTestRunsByEventId } from "@src/hooks/useGetTestRunsByEventId";
import { useGetEventById } from "@src/hooks/useGetEventById";

const Map = dynamic(() => import("../components/Map/Map"), { ssr: false });

const eventId = EVENT_IDS.OF_21_2;

export default function Home() {
  const {
    testRuns,
    isLoading: areTestRunsLoading,
    isError: areTestRunsError,
  } = useGetTestRunsByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });
  const { event } = useGetEventById({ eventId, rootUrl: BASE_API_SERVER_URL });

  const [runTimes, setRunTimes] = useState<[Date, Date] | null>(null);

  const eventDateTimes =
    event?.start_date_time && event?.end_date_time
      ? ([new Date(event.start_date_time), new Date(event?.end_date_time)] as [
          Date,
          Date
        ])
      : null;

  const onRunSelect = (id: string) => {
    const selectedTestRun = testRuns?.find((run) => run.id === id);
    console.log({ selectedTestRun });
    if (selectedTestRun) {
      const { start_date_time, end_date_time } = selectedTestRun;
      setRunTimes([new Date(start_date_time), new Date(end_date_time)]);
    }
  };

  console.log(eventDateTimes?.[0], eventDateTimes?.[1]);

  return (
    <>
      <Head>
        <title>Cesium Map Playground</title>
      </Head>

      <Map
        eventId={eventId}
        runDateTimes={runTimes}
        eventDateTimes={eventDateTimes}
      />
      <Paper
        variant="outlined"
        square
        sx={{ position: "absolute", top: 20, left: 20, width: 300 }}
      >
        <RunSelect onRunSelect={onRunSelect} eventId={eventId} />
      </Paper>
    </>
  );
}
