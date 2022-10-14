import useRequest, { customizeRequestType } from '..'

type getSearchDefaultType = {
  code: number
  data: {
    showKeyword: string
  }
}

export const getSearchDefault: customizeRequestType<any, getSearchDefaultType> = () => {
  const { data, isLoading, isError } = useRequest({
    url: 'api-text/search/default',
    method: 'get',
  })
  return {
    data,
    isLoading,
    isError,
  }
}

type getSearchHotType = {
  code: number
  result: {
    hots: {
      first: string
    }[]
  }
}

export const getSearchHot: customizeRequestType<any, getSearchHotType> = () => {
  const { data, isLoading, isError } = useRequest({
    url: 'api-text/search/hot',
    method: 'get',
  })
  return {
    data,
    isLoading,
    isError,
  }
}

export type getSearchHotDetailType = {
  code: number
  data: {
    searchWord: string
    iconUrl: string
    score: number
    content: string
  }[]
  message: string
}

export const getSearchHotDetail: customizeRequestType<any, getSearchHotDetailType> = () => {
  const { data, isLoading, isError } = useRequest({
    url: 'api-text/search/hot/detail',
    method: 'get',
  })
  return {
    data,
    isLoading,
    isError,
  }
}

//hot topic
export type getSearchHotTopicParamsType = {
  limit: number
  offset: number
}

export type getSearchHotTopicType = {
  code: number
  hot: {
    actId: number
    isDefaultImg: boolean
    participateCount: number
    sharePicUrl: string
    text: string[]
    title: string
  }[]
}

export const getSearchHotTopic: customizeRequestType<getSearchHotTopicParamsType, getSearchHotTopicType> = (params) => {
  const { data, isLoading, isError } = useRequest({
    url: 'api-text/hot/topic',
    method: 'get',
    params,
  })
  return {
    data,
    isLoading,
    isError,
  }
}
