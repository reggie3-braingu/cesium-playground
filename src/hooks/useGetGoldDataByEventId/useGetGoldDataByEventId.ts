import { ListEventTspiEntityRunsApiResponse } from "@src/index";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getQueryString } from "../../utilities/getQueryString";
import { GOLD_DATA_QUERY_KEY } from "../queryConstants";

export interface UseGetGoldDataByEventIdArgs {
  rootUrl: string;
  eventId: string;
  queryOptions?: UseQueryOptions<ListEventTspiEntityRunsApiResponse>;
  queryStringParameters?: Record<string, string>;
  isDebugEnabled?: boolean;
}

export const useGetGoldDataByEventId = ({
  rootUrl,
  eventId,
  queryStringParameters = {},
  isDebugEnabled,
  queryOptions,
}: UseGetGoldDataByEventIdArgs) => {
  isDebugEnabled &&
    console.debug("------ useGetGoldDataByEventId Debug enabled -----");

  const fullQueryStringParams: Record<string, string> = {
    event: eventId,
    ...queryStringParameters,
  };

  // create an array of query keys so that we run this query if the query keys change.
  // We will add them to the useQuery's array in its "queryKey" value
  const queryParamQueryKeys = Object.values(fullQueryStringParams);
  const queryString = getQueryString(fullQueryStringParams);
  const URL = `${rootUrl}/splat/eventtspientityrun/?${queryString}`;

  const useQueryResponse = useQuery<ListEventTspiEntityRunsApiResponse>({
    queryFn: () => axios.get(URL),
    queryKey: [GOLD_DATA_QUERY_KEY, queryParamQueryKeys],
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
    goldData: useQueryResponse.data,
    ...useQueryResponse,
  };
};

export default useGetGoldDataByEventId;
