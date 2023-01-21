import { Event } from "@src/index";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { EVENT_QUERY_KEY } from "../queryConstants";

export interface UseGetEventByIdArgs {
  rootUrl: string;
  eventId: string;
  queryOptions?: UseQueryOptions<Event>;
  isDebugEnabled?: boolean;
}

export const UseGetEventById = ({
  rootUrl,
  eventId,
  isDebugEnabled,
  queryOptions,
}: UseGetEventByIdArgs) => {
  isDebugEnabled && console.debug("------ UseGetEventById Debug enabled -----");

  const URL = `${rootUrl}/splat/event/${eventId}/`;

  const useQueryResponse = useQuery<Event>({
    queryFn: () => axios.get(URL),
    queryKey: [EVENT_QUERY_KEY, eventId],
    placeholderData: {} as Event,
    enabled: !!eventId,
    select: (response) => {
      const axiosResponse = response as unknown as AxiosResponse;

      return axiosResponse?.data || ({} as Event);
    },
    ...queryOptions,
  });

  return {
    event: useQueryResponse.data,
    ...useQueryResponse,
  };
};

export default UseGetEventById;
