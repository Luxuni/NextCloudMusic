import useRequest, { customizeRequestType } from '..'

type PlaylistDetailType = {
  code: number
  playlist: {
    algTags: string[]
    commentCount: number
    coverImgUrl: string
    createTime: number
    creator: {
      avatarUrl: string
      nickname: string
      userId: number
    }
    description: string
    id: number
    name: string
    updateTime: number
    userId: number
    playCount: number
    shareCount: number
    subscribedCount: number
    subscribers: {}[]
    tags: string[]
    trackIds: {}[]
    tracks: {}[]
  }
  privileges: {}
}

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
