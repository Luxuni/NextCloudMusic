import Link from 'next/link'
import { ReactElement } from 'react'
import LoginLayout from '../../src/components/layout/login-layout'
import QRImage from '../../src/components/login/QRImage'
import { NextPageWithLayout } from '../_app'

const QRPage: NextPageWithLayout = () => {
  return (
    <div className="card w-96 glass animated fadeInUp">
      <figure className="flex flex-col mb-4">
        <h1 className="h-28 text-3xl font-black flex items-center">欢迎登陆</h1>
        <div>请打开网易云音乐APP扫描此二维码</div>
      </figure>
      <div className="card-body h-72 pt-0 items-center justify-around">
        <QRImage />
        <Link className="mt-2 p-2" href={'/login'}>
          使用手机号登陆？
        </Link>
      </div>
    </div>
  )
}

QRPage.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>
}

export default QRPage
