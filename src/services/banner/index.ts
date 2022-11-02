import useRequest, { customizeRequestType } from '..'

type BannerType = {
  pic: string
  bannerId: string
}[]

export const getBanner: customizeRequestType<{ type: number }, { banners: BannerType; code: number }> = (params) => {
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
