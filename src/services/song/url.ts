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
    url: 'api-text/song/url',
    method: 'get',
    params,
  })
}
