import { AxiosPromise } from 'axios'
import request from '../request'

export type getSongUrlType = {
  code: number
  data: {
    id: number
    url: string
    br: number
  }[]
}

export const getSongUrl = (params: { id: number }): AxiosPromise<getSongUrlType> => {
  return request({
    url: 'song/url',
    method: 'get',
    params,
  })
}

// get lyric
export type getLyricType = {
  code: number
  lrc: {
    version: number
    lyric: string
  }
  tlyric: {
    version: number
    lyric: string
  }
  klyric: {
    version: number
    lyric: string
  }
}

export const getLyric = (params: { id: number }): AxiosPromise<getLyricType> => {
  return request({
    url: 'lyric',
    method: 'get',
    params,
  })
}
