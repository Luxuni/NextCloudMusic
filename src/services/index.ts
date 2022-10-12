import { AxiosRequestConfig } from 'axios'
import useSWR from 'swr'
import request from './request'

export type fetcherType<D = any> = (config: AxiosRequestConfig<D>) => Promise<D>

export type useRequestType<D = any> = (config: AxiosRequestConfig<D>) => { data: D; isLoading: boolean; isError: any }

export type customizeRequestType<T = any, D = any> = (params?: T) => { data: D; isLoading: boolean; isError: any }

const fetcher: fetcherType = (config) => request({ ...config }).then((res) => res.data)

const useRequest: useRequestType = (config) => {
  const { data, error } = useSWR(config, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useRequest
