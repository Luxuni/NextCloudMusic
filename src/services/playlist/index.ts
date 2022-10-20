import useRequest, { customizeRequestType } from '..'

type PlaylistDetailType = {}
export const getPlaylistDetail: customizeRequestType<{ id: string }, PlaylistDetailType> = (params) => {
  const { data, isLoading, isError } = useRequest({
    url: 'api-text/playlist/detail',
    method: 'get',
    params,
  })
  return {
    data,
    isLoading,
    isError,
  }
}
