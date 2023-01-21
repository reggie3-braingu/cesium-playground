import { ListEventTestRunsApiResponse } from "@src/index";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getQueryString } from "../../utilities/getQueryString";
import { TEST_RUN_DATA_QUERY_KEY } from "../queryConstants";

export interface UseGetTestRunsByEventIdArgs {
  rootUrl: string;
  eventId: string;
  queryOptions?: UseQueryOptions<ListEventTestRunsApiResponse>;
  queryStringParameters?: Record<string, string>;
  isDebugEnabled?: boolean;
}

export const useGetTestRunsByEventId = ({
  rootUrl,
  eventId,
  queryStringParameters = {},
  isDebugEnabled,
  queryOptions,
}: UseGetTestRunsByEventIdArgs) => {
  isDebugEnabled &&
    console.debug("------ useGetTestRunsByEventId Debug enabled -----");

  const fullQueryStringParams: Record<string, string> = {
    event: eventId,
    ...queryStringParameters,
  };

  // create an array of query keys so that we run this query if the query keys change.
  // We will add them to the useQuery's array in its "queryKey" value
  const queryParamQueryKeys = Object.values(fullQueryStringParams);
  const queryString = getQueryString(fullQueryStringParams);
  const URL = `${rootUrl}/splat/testrun/?${queryString}`;

  const useQueryResponse = useQuery<ListEventTestRunsApiResponse>({
    queryFn: () => axios.get(URL),
    queryKey: [TEST_RUN_DATA_QUERY_KEY, queryParamQueryKeys],
    placeholderData: [],
    enabled: !!eventId,
    select: (response) => {
      const axiosResponse = response as unknown as AxiosResponse;
      if (!Array.isArray(axiosResponse?.data)) return [];

      return axiosResponse?.data || [];
    },
    ...queryOptions,
  });

  return {
    testRuns: useQueryResponse.data,
    ...useQueryResponse,
  };
};

export default useGetTestRunsByEventId;
