import { useLockFn, useRequest } from 'ahooks'
import { Button, Toast } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getUnikeyAsync, selectUnikey } from '../../features/unikey/unikeySlice'
import { QRCreat, QRPolling } from '../../services/login'

const QRImage: NextComponentType = () => {
  const [qrimg, setQrimg] = useState<string>('')

  const [isMask, setIsMask] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const unikey = useAppSelector(selectUnikey)

  const dispatchUnikey = useLockFn((cancel?: () => void, callRun?: () => void) => {
    return dispatch(getUnikeyAsync({ cancel, callRun }))
  })

  const createQR = useLockFn(async () => {
    const res = await QRCreat({ key: unikey })
    setQrimg(res.data.data.qrimg)
  })

  const router = useRouter()

  const {
    data: pollingData,
    loading,
    run,
    cancel,
  } = useRequest(
    useLockFn(async () => {
      return unikey === '' ? null : await QRPolling({ key: unikey })
    }),
    {
      pollingInterval: 3000,
      pollingWhenHidden: false,
    },
  )

  const callRun = useCallback(() => {
    run()
  }, [unikey])

  useEffect(() => {
    if (unikey === '') {
      dispatchUnikey(cancel)
    } else {
      createQR()
      callRun()
    }
  }, [unikey])

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
      // show mask
      cancel()
      setIsMask(true)
    }
  }

  return (
    <div className="relative">
      <img className="h-44 w-44" src={qrimg} />
      {/* mask */}
      {isMask && (
        <div className="absolute h-full w-full top-0 bg-black opacity-70 flex items-center justify-center">
          <Button
            size="small"
            color="danger"
            className="bg-red-600 opacity-100"
            onClick={() => {
              dispatchUnikey(cancel, callRun)
              setIsMask(false)
            }}>
            二维码已过期
          </Button>
        </div>
      )}
    </div>
  )
}

export default QRImage
