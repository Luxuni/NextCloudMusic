import { AxiosPromise } from 'axios'
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
