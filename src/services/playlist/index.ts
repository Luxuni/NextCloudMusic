import { AxiosPromise } from 'axios'
import useRequest, { customizeRequestType } from '..'
import { DailySongsType } from '../recommendList'
import request from '../request'

export type PlaylistDetailType = {
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
    tracks: DailySongsType[]
    trackCount: number
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

export const getPlaylistDetailRequest = (params: { id: string }): AxiosPromise<PlaylistDetailType> => {
  return request({
    url: 'api-text/playlist/detail',
    method: 'get',
    params,
  })
}
