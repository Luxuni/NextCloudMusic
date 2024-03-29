import useRequest, { customizeRequestType } from '..'

export type RecommendListParams = {
  limit: number
}

export type RecommendListType = {
  category: number
  code: number
  hasTaste: boolean
  result: {
    id: number
    name: string
    picUrl: string
    playCount: number
    trackCount: number
    trackNumberUpdateTime: number
  }[]
}

export const getRecommendList: customizeRequestType<RecommendListParams, RecommendListType> = (params) => {
  const { data, isLoading, isError } = useRequest({
    url: 'personalized',
    method: 'get',
    params,
  })
  return {
    data,
    isLoading,
    isError,
  }
}

export type RecommendDailyListType = {
  code: number
  recommend: {
    id: number
    name: string
    picUrl: string
    playcount: number
    trackCount: number
  }[]
}

export const getRecommendDailyList: customizeRequestType<any, RecommendDailyListType> = () => {
  const { data, isLoading, isError } = useRequest({
    url: 'recommend/resource',
    method: 'get',
  })
  return {
    data,
    isLoading,
    isError,
  }
}
export type DailySongsType = {
  name: string
  reason: string
  id: number
  mv: number
  al?: {
    id: number
    name: string
    picUrl: string
  }
  artists: {
    id: number
    name: string
  }[]
  ar: {
    id: number
    name: string
  }[]
  url?: string // 由于这个接口没有返回歌曲的url，所以这里自己添加一个
}

export type RecommendSongsType = {
  code: number
  data: {
    dailySongs: DailySongsType[]
    recommendReasons: {}
  }
}

export const getRecommendSongs: customizeRequestType<any, RecommendSongsType> = () => {
  const { data, isLoading, isError } = useRequest({
    url: 'recommend/songs',
    method: 'get',
  })
  return {
    data,
    isLoading,
    isError,
  }
}
