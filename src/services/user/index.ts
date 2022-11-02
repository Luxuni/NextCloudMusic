import { AxiosPromise } from 'axios'
import useRequest, { customizeRequestType } from '..'
import request from '../request'

export type getLoginStatusType = {
  data: {
    code: number
    profile: {
      userId: number
      nickname: string
      avatarUrl: string
      createTime: number
      city: number
      lastLoginTime: number
    }
  }
}

export const getUserLoadingStatus: customizeRequestType<any, getLoginStatusType> = () => {
  const { data, isLoading, isError } = useRequest({
    url: 'login/status',
    method: 'get',
  })
  return {
    data,
    isLoading,
    isError,
  }
}

type getUserLikeListParams = {
  userId: number
}

type getUserLikeListType = {
  ids: number[]
  checkPoint: number
  code: number
}

export const getUserLikeList: customizeRequestType<getUserLikeListParams, getUserLikeListType> = (params) => {
  const { data, isLoading, isError } = useRequest({
    url: 'likelist',
    method: 'get',
    params,
  })
  return {
    data,
    isLoading,
    isError,
  }
}

export const getUserLikeListRequest = (params: getUserLikeListParams): AxiosPromise<getUserLikeListType> => {
  return request({
    url: 'likelist',
    method: 'get',
    params,
  })
}

type likeSongParams = {
  id: number
  like?: boolean
}

type likeSongType = {
  code: number
}

export const likeSong = (params: likeSongParams): AxiosPromise<likeSongType> => {
  return request({
    url: 'like',
    method: 'get',
    params,
  })
}

// /user/subcount
export type getUserSubCountType = {
  programCount: number
  djRadioCount: number
  mvCount: number
  artistCount: number
  newProgramCount: number
  createDjRadioCount: number
  createdPlaylistCount: number
  subPlaylistCount: number
  code: number
}

export const UserSubCount: customizeRequestType<any, getUserSubCountType> = () => {
  const { data, isLoading, isError } = useRequest({
    url: 'user/subcount',
    method: 'get',
  })
  return {
    data,
    isLoading,
    isError,
  }
}

export const UserSubCountRequest = (): AxiosPromise<getUserSubCountType> => {
  return request({
    url: 'user/subcount',
    method: 'get',
  })
}

// /user/detail
type getUserDetailParams = {
  uid: number
}

export type getUserDetailType = {
  level: number
  listenSongs: number
  userPoint: {
    userId: number
    balance: number
    updateTime: number
    version: number
    status: number
    blockBalance: number
  }
  profile: {
    followeds: number
    follows: number
  }
}

export const getUserDetail: customizeRequestType<getUserDetailParams, getUserDetailType> = (params) => {
  const { data, isLoading, isError } = useRequest({
    url: 'user/detail',
    method: 'get',
    params,
  })
  return {
    data,
    isLoading,
    isError,
  }
}

// /user/playlist
type getUserPlaylistParams = {
  uid: number
  limit?: number
  offset?: number
}

export type playlistType = {
  subscribed: boolean
  coverImgUrl: string
  createTime: number
  id: number
  name: string
  trackCount: number
  userId: number
  creator: {
    avatarUrl: string
    nickname: string
    userId: number
  }
}

export type getUserPlaylistType = {
  code: number
  more: boolean
  playlist: playlistType[]
}

export const getUserPlaylist = (params: getUserPlaylistParams): AxiosPromise<getUserPlaylistType> => {
  return request({
    url: 'user/playlist',
    method: 'get',
    params,
  })
}
