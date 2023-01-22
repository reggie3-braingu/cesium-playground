import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UiState {
  emitterLabelsVisible: boolean;
  toggleEmitterLabelsVisible: () => void;
  assetLabelsVisible: boolean;
  toggleAssetLabelsVisible: () => void;
}

const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        emitterLabelsVisible: true,
        assetLabelsVisible: true,
        toggleEmitterLabelsVisible: () =>
          set((state) => ({
            emitterLabelsVisible: !state.emitterLabelsVisible,
          })),
        toggleAssetLabelsVisible: () =>
          set((state) => ({
            assetLabelsVisible: !state.assetLabelsVisible,
          })),
      }),
      {
        name: "ui-storage",
      }
    )
  )
);

export default useUiStore;
