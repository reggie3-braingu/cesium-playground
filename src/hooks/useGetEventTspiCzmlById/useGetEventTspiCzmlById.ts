import { TspiCzml } from "@src/index";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { TSPI_CZML } from "../queryConstants";

export interface UseGetEventTspiCzmlByIdArgs {
  rootUrl: string;
  id: string;
  queryOptions?: UseQueryOptions<TspiCzml>;
  isDebugEnabled?: boolean;
}

export const useGetEventTspiCzmlById = ({
  rootUrl,
  id,
  isDebugEnabled,
  queryOptions,
}: UseGetEventTspiCzmlByIdArgs) => {
  isDebugEnabled &&
    console.debug("------ useGetEventTspiCzmlById Debug enabled -----");

  const URL = `${rootUrl}/event_map/event_tspi_czml/${id}/`;

  const useQueryResponse = useQuery<TspiCzml>({
    queryFn: () => axios.get(URL),
    queryKey: [TSPI_CZML, id],
    placeholderData: [],
    enabled: !!id,
    select: (response) => {
      const axiosResponse = response as unknown as AxiosResponse;
      if (!Array.isArray(axiosResponse?.data)) return [];

      return axiosResponse?.data || [];
    },
    ...queryOptions,
  });

  return {
    czml: useQueryResponse.data,
    ...useQueryResponse,
  };
};

export default useGetEventTspiCzmlById;
