import { Toast } from 'antd-mobile'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, startTransition } from 'react'
import { useImmer } from 'use-immer'
import { useHandleObjectData } from '../../src/app/hooks'
import LoginLayout from '../../src/components/layout/login-layout'
import MyInput from '../../src/components/public/MyInput'
import { loginByPhone } from '../../src/services/login'
import { NextPageWithLayout } from '../_app'

type loginValueType = {
  phone: string
  password: string
}

const LoginPage: NextPageWithLayout = () => {
  const [data, setData] = useImmer({
    phone: '',
    password: '',
  })

  const handleData = useHandleObjectData<typeof data>(setData)

  const router = useRouter()

  const handleLogin = async (value: loginValueType) => {
    const res = await loginByPhone(value)
    //save token
    localStorage.setItem('token', res.data.token)
    //can go home???
    if (res.data.code === 200) {
      //go home
      router.push('/home')
    }
  }
  return (
    <div className="card w-96 glass animated fadeInUp">
      <figure>
        <h1 className="h-28 text-3xl font-black flex items-center">欢迎登陆</h1>
      </figure>
      <div className="card-body h-72 pt-0">
        <div className="form-control h-full justify-around">
          <MyInput
            rules={[{ required: data.phone !== '', message: '请输入账号！' }]}
            labelName="账号"
            placeholder="请输入账号"
            onChange={(e) => {
              startTransition(() => {
                handleData('phone', e.target.value)
              })
            }}
          />
          <MyInput
            rules={[{ required: data.password !== '', message: '请输入密码' }]}
            labelName="密码"
            placeholder="请输入密码"
            onChange={(e) => {
              startTransition(() => {
                handleData('password', e.target.value)
              })
            }}
          />
          <div className="flex items-center justify-between">
            <div>
              <Link href={'/login/qr'}>使用二维码登陆？</Link>
            </div>
            <button
              className="btn btn-active btn-secondary w-24 text-theme-text"
              onClick={() => {
                let key: keyof typeof data
                for (key in data) {
                  if (data[key] === '') {
                    return Toast.show({ content: '请填写账号和密码！' })
                  } else {
                    handleLogin(data)
                  }
                }
              }}>
              登陆
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>
}

export default LoginPage
