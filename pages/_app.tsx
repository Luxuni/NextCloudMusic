// import 'antd/dist/antd.css'
import 'animate.css/source/animate.css'
import { enableAllPlugins, enableMapSet } from 'immer'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React, { ReactElement, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { themeChange } from 'theme-change'
import store from '../src/app/store'
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

  useEffect(() => {
    themeChange(false)
    document.documentElement.setAttribute('data-theme', 'pastel')
    // 👆 false parameter is required for react project
  }, [])
  return <Provider store={store}>{getLayout(<Component {...pageProps}></Component>)}</Provider>
}
