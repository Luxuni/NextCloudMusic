import { AxiosPromise } from 'axios'
import useRequest, { customizeRequestType } from '..'
import { DailySongsType } from '../recommendList'
import request from '../request'

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

// Enter a keyword to search
export type getSearchResultType = {
  code: number
  result: {
    songs: DailySongsType[]
  }
}

type getSearchResultParamsType = {
  keywords: string
  limit: number
}

export const getSearchResult = (params: getSearchResultParamsType): AxiosPromise<getSearchResultType> => {
  return request({
    url: 'api-text/search',
    method: 'get',
    params,
  })
}

// search suggest
type getSearchSuggestParamsType = {
  keywords: string
  type: 'mobile' | 'web'
}

type getSearchSuggestType = {
  code: number
  result: {
    allMatch: {
      keyword: string
    }[]
  }
}

export const getSearchSuggest = (params: getSearchSuggestParamsType): AxiosPromise<getSearchSuggestType> => {
  return request({
    url: 'api-text/search/suggest',
    method: 'get',
    params,
  })
}
