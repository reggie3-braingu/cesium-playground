import { TspiCzml } from "@src/index";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { TSPI_CZML } from "../queryConstants";

export interface UseGetEmitterCzmlByIdArgs {
  rootUrl: string;
  id: string;
  queryOptions?: UseQueryOptions<TspiCzml>;
  isDebugEnabled?: boolean;
}

export const useGetEmitterCzmlById = ({
  rootUrl,
  id,
  isDebugEnabled,
  queryOptions,
}: UseGetEmitterCzmlByIdArgs) => {
  isDebugEnabled &&
    console.debug("------ useGetEmitterCzmlById Debug enabled -----");

  const URL = `${rootUrl}/event_map/event_emitter_czml/${id}/`;

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

export default useGetEmitterCzmlById;
