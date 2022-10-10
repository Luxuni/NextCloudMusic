import useRequest, { customizeRequestType } from '..'
export const getBanner: customizeRequestType<{ type: number }, { banners: any; code: number }> = (params) => {
  const { data, isLoading, isError } = useRequest({
    url: 'banner',
    method: 'get',
    params,
  })
  return {
    data,
    isLoading,
    isError,
  }
}
