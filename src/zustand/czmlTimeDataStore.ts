import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CzmlTimeDataState {
  earliestEpochDateTime: Date | null;
  availabilityDateTimeRange: [Date, Date] | null;
  setEarliestEpochDateTime: (date: Date) => void;
  setAvailabilityDateTimeRange: (dates: [Date, Date]) => void;
}

const useCzmlTimeDataStore = create<CzmlTimeDataState>()(
  devtools(
    persist(
      (set) => ({
        earliestEpochDateTime: null,
        availabilityDateTimeRange: null,
        setEarliestEpochDateTime: (date: Date) =>
          set(() => ({
            earliestEpochDateTime: date,
          })),
        setAvailabilityDateTimeRange: (dates: [Date, Date]) =>
          set(() => ({
            availabilityDateTimeRange: dates,
          })),
      }),
      {
        name: "czml-time-data-storage",
      }
    )
  )
);

export default useCzmlTimeDataStore;
