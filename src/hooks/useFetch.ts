import { useQuery } from "react-query"
import { api } from "../services/api"
import { AxiosRequestConfig } from "axios"

interface IFetchProps {
  url: string
  id: string 
  scaleTime?: number
  params?: AxiosRequestConfig
}

export function useFetch<T>({
  url,  id,  scaleTime = 1000 * 60 * 10,  params,
}: IFetchProps): {
  data: T | undefined;
  isFetching: boolean;
} {
  const { data, isFetching } = useQuery<T>(id, async () => {
    const response = await api.get<T>(url, { params });
    return response.data;
  }, {
    // Additional parameters
    staleTime: scaleTime,
    // 1000 * 60 * 10 // 10 minutes //? Tempo para refazer a a requisição
  });

  return {
    data,
    isFetching,
  };
}