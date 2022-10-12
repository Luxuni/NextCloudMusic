import useRequest, { customizeRequestType } from '..'

type RecommendListParams = {
  limit: number
}

type RecommendListType = {
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
    url: 'api-text/personalized',
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
    playCount: number
    trackCount: number
  }[]
}

export const getRecommendDailyList: customizeRequestType<any, RecommendDailyListType> = () => {
  const { data, isLoading, isError } = useRequest({
    url: 'api-text/recommend/resource',
    method: 'get',
  })
  return {
    data,
    isLoading,
    isError,
  }
}
