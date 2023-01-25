import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ClockState {
  seconds: number;
  setSeconds: (seconds: number) => void;
}

const useClockStore = create<ClockState>()(
  devtools(
    persist(
      (set) => ({
        seconds: 0,
        setSeconds: (newSeconds: number) =>
          set(() => ({
            seconds: newSeconds,
          })),
      }),
      {
        name: "ui-storage",
      }
    )
  )
);

export default useClockStore;
