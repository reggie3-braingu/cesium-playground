import { ListEventEmitterSitesApiResponse } from "@src/index";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getQueryString } from "../../utilities/getQueryString";
import { EMITTER_SITE_DATA_QUERY_KEY } from "../queryConstants";

export interface UseGetEmitterSitesByEventIdArgs {
  rootUrl: string;
  eventId: string;
  queryOptions?: UseQueryOptions<ListEventEmitterSitesApiResponse>;
  queryStringParameters?: Record<string, string>;
  isDebugEnabled?: boolean;
}

export const UseGetEmitterSitesByEventId = ({
  rootUrl,
  eventId,
  queryStringParameters = {},
  isDebugEnabled,
  queryOptions,
}: UseGetEmitterSitesByEventIdArgs) => {
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
  const URL = `${rootUrl}/splat/eventemittersite/?${queryString}`;

  const useQueryResponse = useQuery<ListEventEmitterSitesApiResponse>({
    queryFn: () => axios.get(URL),
    queryKey: [EMITTER_SITE_DATA_QUERY_KEY, queryParamQueryKeys],
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

export default UseGetEmitterSitesByEventId;
