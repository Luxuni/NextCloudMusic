import useRequest, { customizeRequestType } from '..'

type getSearchDefaultType = {
  code: number
  data: {
    showKeyword: string
  }
}

export const getSearchDefault: customizeRequestType<any, getSearchDefaultType> = (params) => {
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

export const getSearchHot: customizeRequestType<any, getSearchHotType> = (params) => {
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
