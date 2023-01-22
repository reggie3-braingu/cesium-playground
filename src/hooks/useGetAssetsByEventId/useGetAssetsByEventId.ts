import { EventAsset, ListEventEmitterSitesApiResponse } from "@src/index";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getQueryString } from "../../utilities/getQueryString";
import {
  ASSETS_QUERY_KEY,
  EMITTER_SITE_DATA_QUERY_KEY,
} from "../queryConstants";

export interface UseGetAssetsByEventIdArgs {
  rootUrl: string;
  eventId: string;
  queryOptions?: UseQueryOptions<EventAsset[]>;
  queryStringParameters?: Record<string, string>;
  isDebugEnabled?: boolean;
}

export const UseGetAssetsByEventId = ({
  rootUrl,
  eventId,
  queryStringParameters = {},
  isDebugEnabled,
  queryOptions,
}: UseGetAssetsByEventIdArgs) => {
  isDebugEnabled &&
    console.debug("------ useGetEmitterSites Debug enabled -----");

  const fullQueryStringParams: Record<string, string> = {
    event: eventId,
    ...queryStringParameters,
  };

  // create an array of query keys so that we run this query if the query keys change.
  // We will add them to the useQuery's array in its "queryKey" value
  const queryParamQueryKeys = Object.values(fullQueryStringParams);
  const queryString = getQueryString(fullQueryStringParams);
  const URL = `${rootUrl}/splat/eventasset/?${queryString}`;

  const useQueryResponse = useQuery<EventAsset[]>({
    queryFn: () => axios.get(URL),
    queryKey: [ASSETS_QUERY_KEY, queryParamQueryKeys],
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
    emitterSites: useQueryResponse.data,
    ...useQueryResponse,
  };
};

export default UseGetAssetsByEventId;
