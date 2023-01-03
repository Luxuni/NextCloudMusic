import { Toast } from 'antd-mobile'
import axios, { AxiosRequestConfig } from 'axios'

//take token
const handleToken = (config: AxiosRequestConfig<any>) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = { token: token, 'X-Requested-With': 'XMLHttpRequest' }
  }
  return config
}

//Status code handling
const handleNetworkError = (errStatus: number, data: { code: number; message: string; msg: string }) => {
  let errMessage = '未知错误'
  const errMap = new Map([
    [400, '请求错误'],
    [401, '未授权，请登录'],
    [403, '拒绝访问'],
    [404, `请求地址出错: ${errStatus}`],
    [408, '请求超时'],
    [500, '服务器内部错误'],
    [501, '服务未实现'],
    [502, '网关错误'],
    [503, '服务不可用'],
    [504, '网关超时'],
    [505, 'HTTP版本不受支持'],
  ])
  if (errMap.has(errStatus)) {
    errMessage = data.message ? data.message : errMap.get(errStatus) || '未知错误'
    Toast.show({
      content: errMessage,
    })
  }
  return errMessage
}

//handing error code
const handleCodeError = (data: { code: number; message: string; msg: string }) => {
  //do some code error handling here
}

//cancel the request?
const CancelToken = axios.CancelToken
const source = CancelToken.source()

//base config
const request = axios.create({
  baseURL: 'api',
  timeout: 10000,
  //allow coookies
  withCredentials: true,
  //Configuration release status code
  validateStatus: function (status) {
    return status === 200 // default is 200
  },
})

//request interceptor
request.interceptors.request.use(
  (config) => {
    //Handling request headers
    config = handleToken(config)
    config.params = {
      ...config.params,
      timestamp: new Date().getTime(), //with timestamp
      realIP: '116.25.146.177',
    }
    config.cancelToken = source.token
    return config
  },
  //if error???
  (err: Error) => {
    return Promise.reject(err)
  },
)

//response interceptor
request.interceptors.response.use(
  (config) => {
    return config
  },
  (err: any) => {
    handleNetworkError(err.response?.status, err.response?.data)
    return Promise.reject(err.response)
  },
)
export default request
