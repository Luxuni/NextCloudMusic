// import 'antd/dist/antd.css'
import '../src/styles/vars.css'
import '../src/styles/global.css'
import 'animate.css/source/animate.css'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import store from '../src/app/store'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>,
  )
}
