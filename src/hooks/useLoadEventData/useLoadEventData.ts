import { BASE_API_SERVER_URL } from "@src/globals";
import { useGetEmitterSitesByEventId } from "../useGetEmitterSitesByEventId";
import { useGetTspiEntityRunsByEventId } from "../useGetTspiEntityRunsByEventId";
import { useGetEventBoundariesByEventId } from "../useGetEventBoundariesByEventId";
import useGetGoldDataByEventId from "../useGetGoldDataByEventId/useGetGoldDataByEventId";
import { useGetTestRunsByEventId } from "../useGetTestRunsByEventId";

const useLoadEventData = ({ eventId }: { eventId: string }) => {
  const {
    entityRunData,
    isLoading: isCzmlLoading,
    isError: isCzmlError,
  } = useGetTspiEntityRunsByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });
  const {
    emitterSites,
    isLoading: areEmittersLoading,
    isError: areEmittersError,
  } = useGetEmitterSitesByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });
  const {
    boundaries,
    isLoading: areBoundariesLoading,
    isError: areBoundariesError,
  } = useGetEventBoundariesByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });
  const {
    testRuns,
    isLoading: areTestRunsLoading,
    isError: areTestRunsError,
  } = useGetTestRunsByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });
  const {
    goldData,
    isLoading: isGoldDataLoading,
    isError: isGoldDataError,
  } = useGetGoldDataByEventId({
    rootUrl: BASE_API_SERVER_URL,
    eventId,
  });

  return {
    entityRunData,
    isCzmlLoading,
    isCzmlError,
    emitterSites,
    areEmittersLoading,
    areEmittersError,
    boundaries,
    areBoundariesLoading,
    areBoundariesError,
    testRuns,
    areTestRunsLoading,
    areTestRunsError,
    goldData,
    isGoldDataLoading,
    isGoldDataError,
  };
};
export default useLoadEventData;
