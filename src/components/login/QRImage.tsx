import { useRequest } from 'ahooks'
import { SpinLoading, Toast } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { getQRKey, QRCreat, QRPolling } from '../../services/login'
import { HOC } from '../player/HOC'

type OptionsProps = {
  unikey?: string
}

function PushIntoUnikey(WrapComponent: NextComponentType<{}, {}, Required<OptionsProps>>) {
  return function PushIntoUnikeyIndex() {
    const { data, isLoading, isError } = getQRKey()
    if (isLoading) return <div className="h-44 w-44"></div>
    return <WrapComponent unikey={data.data.unikey} />
  }
}

const QRImage: NextComponentType<{}, {}, Required<OptionsProps>> = (props) => {
  const router = useRouter()
  const { data, isLoading, isError } = QRCreat({ key: props.unikey })

  const {
    data: pollingData,
    loading,
    run,
    cancel,
  } = useRequest(QRPolling, {
    pollingInterval: 3000,
    pollingWhenHidden: false,
  })

  const callRun = useCallback(() => {
    run({ key: props.unikey })
  }, [])

  useEffect(() => {
    callRun()
    return () => {
      cancel()
    }
  }, [])

  if (isLoading)
    return (
      <div className="h-44 w-44">
        <SpinLoading style={{ '--size': '48px' }} />
      </div>
    )

  if (loading) {
    console.log(pollingData?.data)
    if (pollingData?.data.code === 803) {
      Toast.show({
        content: pollingData?.data.message,
      })
      router.push('/home')
    }
    if (pollingData?.data.code === 800) {
      Toast.show({
        content: pollingData?.data.message,
      })
    }
  }

  return <img className="h-44 w-44" src={data.data.qrimg} />
}

export default HOC<OptionsProps>((props) => props['unikey'])(PushIntoUnikey(QRImage))
