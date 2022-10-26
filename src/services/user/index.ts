import { AxiosPromise } from 'axios'
import useRequest, { customizeRequestType } from '..'
import request from '../request'

type getLoginStatusType = {
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
    url: 'api-text/login/status',
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

// export const getUserLikeList = (params: getUserLikeListParams): AxiosPromise<getUserLikeListType> => {
//   return request({
//     url: 'api-text/likelist',
//     method: 'get',
//     params,
//   })
// }

export const getUserLikeList: customizeRequestType<getUserLikeListParams, getUserLikeListType> = (params) => {
  const { data, isLoading, isError } = useRequest({
    url: 'api-text/likelist',
    method: 'get',
    params,
  })
  return {
    data,
    isLoading,
    isError,
  }
}
