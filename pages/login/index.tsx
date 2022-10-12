import { Button, Card, Form, Input } from 'antd-mobile'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import LoginLayout from '../../src/components/layout/login-layout'
import { loginByPhone } from '../../src/services/login'
import { NextPageWithLayout } from '../_app'

type loginValueType = {
  phone: string
  password: string
}

const LoginPage: NextPageWithLayout = () => {
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
    <Card className="w-5/6 animated fadeIn">
      <h1 className="w-full text-center font-bold text-2xl mb-3 mt-3">欢迎登陆</h1>
      <Form
        layout="horizontal"
        mode="card"
        footer={
          <Button block type="submit" color="primary">
            登陆
          </Button>
        }
        onFinish={handleLogin}>
        <Form.Item label={<span>手机号</span>} name="phone">
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item label={<span>密码</span>} name="password">
          <Input placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </Card>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>
}

export default LoginPage
