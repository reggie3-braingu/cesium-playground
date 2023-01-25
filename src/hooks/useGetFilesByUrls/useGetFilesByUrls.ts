import { KmlFile } from "@src/index";
import { useQueries, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { KML_FILE_QUERY_KEY } from "../queryConstants";

type GetFileResponse = {
  fileText: string;
  id: string;
};

export type GetFilesResponse = GetFileResponse[];

export interface useGetFilesByUrlsArgs {
  urlConfigs: { itemId: string; url: string }[];
  queryOptions?: UseQueryOptions<KmlFile>;
  isDebugEnabled?: boolean;
}

export const useGetFilesByUrls = ({
  urlConfigs,
  isDebugEnabled,
  queryOptions,
}: useGetFilesByUrlsArgs) => {
  isDebugEnabled &&
    console.debug("------ useGetFilesByUrls Debug enabled -----");

  const useQueriesResponse = useQueries<GetFilesResponse>({
    queries: urlConfigs.map((urlConfig) => {
      return {
        queryKey: [KML_FILE_QUERY_KEY, urlConfig.url],
        queryFn: () => axios.get(urlConfig.url),
        select: (response: unknown) => {
          const axiosResponse = response as unknown as AxiosResponse;

          return {
            fileText: axiosResponse?.data,
            itemId: urlConfig.itemId,
          };
        },
        ...queryOptions,
      };
    }),
  });

  return useQueriesResponse;
};

export default useGetFilesByUrls;
