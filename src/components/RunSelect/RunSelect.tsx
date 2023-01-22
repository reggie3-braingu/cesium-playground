import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { BASE_API_SERVER_URL } from "@src/globals";
import { useGetTestRunsByEventId } from "@src/hooks/useGetTestRunsByEventId";
import React, { useState } from "react";

interface RunSelectProps {
  eventId: string;
  onRunSelect: (id: string) => void;
}

const RunSelect = ({ eventId, onRunSelect }: RunSelectProps) => {
  const {
    testRuns,
    isLoading: areTestRunsLoading,
    isError: areTestRunsError,
  } = useGetTestRunsByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });

  const [selectedTestRun, setSelectedTestRun] = useState<string>();

  const onSelectChange = (event: SelectChangeEvent) => {
    setSelectedTestRun(event.target.value as string);
    onRunSelect(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Test Run</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedTestRun ?? ""}
        label="Age"
        onChange={onSelectChange}
      >
        {testRuns
          ?.filter((run) => !!run?.id)
          .map((run) => {
            return (
              <MenuItem key={run.id} value={run.id}>
                {run.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default RunSelect;
