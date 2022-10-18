// import 'antd/dist/antd.css'
import 'animate.css/source/animate.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React, { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from '../src/app/store'
import '../src/styles/global.css'
import '../src/styles/vars.css'
import { enableMapSet } from 'immer'

enableMapSet()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<{ children?: React.ReactNode }>
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <Provider store={store}>{getLayout(<Component {...pageProps}></Component>)}</Provider>
}
