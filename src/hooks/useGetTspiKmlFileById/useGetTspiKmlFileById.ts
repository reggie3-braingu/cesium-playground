import { KmlFile } from "@src/index";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { KML_FILE_QUERY_KEY } from "../queryConstants";

export interface UseGetTspiKmlFileByIdArgs {
  rootUrl: string;
  id: string;
  queryOptions?: UseQueryOptions<KmlFile>;
  isDebugEnabled?: boolean;
}

export const useGetTspiKmlFileById = ({
  rootUrl,
  id,
  isDebugEnabled,
  queryOptions,
}: UseGetTspiKmlFileByIdArgs) => {
  isDebugEnabled &&
    console.debug("------ useGetTspiKmlById Debug enabled -----");

  const URL = `${rootUrl}/event_map/retrieve_kml_file/${id}/`;

  const useQueryResponse = useQuery<KmlFile>({
    queryFn: () => axios.get(URL),
    queryKey: [KML_FILE_QUERY_KEY, id],
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
    kml: useQueryResponse.data,
    ...useQueryResponse,
  };
};

export default useGetTspiKmlFileById;
