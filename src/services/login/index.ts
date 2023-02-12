import { AxiosPromise } from 'axios'
import useRequest, { customizeRequestType } from '..'
import request from '../request'

type loginByPhoneParamsType = {
  phone: string
  password: string
}

type loginByPhoneType = {
  code: number
  token: string
}

export const loginByPhone = (params: loginByPhoneParamsType): AxiosPromise<loginByPhoneType> => {
  return request({
    url: 'login/cellphone',
    method: 'post',
    data: params,
  })
}

type qrKetType = {
  code: number
  data: {
    code: number
    unikey: string
  }
}

export const getQRKey: customizeRequestType<null, qrKetType> = () => {
  const { data, isLoading, isError } = useRequest({
    url: 'login/qr/key',
    method: 'get',
  })
  return {
    data,
    isLoading,
    isError,
  }
}

type qrType = {
  code: number
  data: {
    qrimg: string
    qrurl: string
  }
}

export const QRCreat: customizeRequestType<{ key: string }, qrType> = (params) => {
  const { data, isLoading, isError } = useRequest({
    url: '/login/qr/create',
    method: 'get',
    params: {
      ...params,
      qrimg: true,
    },
  })
  return {
    data,
    isLoading,
    isError,
  }
}

type qrPollingType = {
  code: number
  cookie: string
  message: string
}

export const QRPolling = (params: { key: string }): AxiosPromise<qrPollingType> => {
  return request({
    url: 'login/qr/check',
    method: 'get',
    params,
  })
}

//Get user login status
export const getUserStatus = (): AxiosPromise<{
  data: {
    code: number
    profile: {} | null
  }
}> => {
  return request({
    url: 'login/status',
    method: 'get',
  })
}

//login out
export const loginOut = (): AxiosPromise<{
  data: {
    code: number
  }
}> => {
  return request({
    url: 'logout',
    method: 'post',
  })
}
