import useRequest, { customizeRequestType } from '..'

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
