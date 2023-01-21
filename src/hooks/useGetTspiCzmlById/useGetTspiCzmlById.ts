import { ListEventEmitterSitesApiResponse } from "@src/index";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getQueryString } from "../../utilities/getQueryString";
import { EMITTER_SITE_DATA_QUERY_KEY } from "../queryConstants";

export interface UseGetTspiCzmlById {
  czmlUrl: string;
  queryOptions?: UseQueryOptions<ListEventEmitterSitesApiResponse>;
  isDebugEnabled?: boolean;
}

export const useGetTspiCzmlById = ({
  czmlUrl,

  isDebugEnabled,
  queryOptions,
}: UseGetTspiCzmlById) => {
  isDebugEnabled &&
    console.debug("------ useGetTspiByCzmlId Debug enabled -----");

  // create an array of query keys so that we run this query if the query keys change.
  // We will add them to the useQuery's array in its "queryKey" value

  const useQueryResponse = useQuery<ListEventEmitterSitesApiResponse>({
    queryFn: () => axios.get(czmlUrl),
    queryKey: [EMITTER_SITE_DATA_QUERY_KEY, czmlUrl],
    placeholderData: [],
    enabled: !!czmlUrl,
    select: (response) => {
      const axiosResponse = response as unknown as AxiosResponse;
      if (!Array.isArray(axiosResponse?.data)) return [];

      return axiosResponse?.data || [];
    },
    ...queryOptions,
  });

  return {
    tspiCzml: useQueryResponse.data,
    ...useQueryResponse,
  };
};

export default useGetTspiCzmlById;
