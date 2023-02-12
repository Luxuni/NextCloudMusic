// import 'antd/dist/antd.css'
import { useAsyncEffect, useLockFn } from 'ahooks'
import 'animate.css/source/animate.css'
import { enableAllPlugins, enableMapSet } from 'immer'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from '../src/app/store'
import { getUserStatus } from '../src/services/login'
import '../src/styles/global.css'
import '../src/styles/vars.css'

enableMapSet()
enableAllPlugins()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<{ children?: React.ReactNode }>
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const router = useRouter()

  const lockFnGetUserStatus = useLockFn(async () => {
    return await getUserStatus()
  })

  useAsyncEffect(async () => {
    // themeChange(false)
    // document.documentElement.setAttribute('data-theme', 'pastel')
    // 👆 false parameter is required for react project
    const res = await lockFnGetUserStatus()
    if (res && (router.pathname === '/login' || router.pathname === '/login/qr')) {
      if (res?.data.data.profile !== null) {
        router.push('/home')
      }
    }
  }, [])
  return <Provider store={store}>{getLayout(<Component {...pageProps}></Component>)}</Provider>
}
