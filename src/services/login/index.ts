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
  unikey: string
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
