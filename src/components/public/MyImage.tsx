import { NextPageWithLayout } from '../../../pages/_app'
import { Image } from 'antd-mobile'
// import Image from 'next/image'

type MyImageType = {
  src: string | undefined
  width?: string
  height?: string
  borderRadius?: number | string
  className?: string
}
const MyImage: NextPageWithLayout<MyImageType> = (props) => {
  return (
    <Image
      className={props.className}
      lazy
      src={props.src}
      width={props.width ?? '100%'}
      height={props.height ?? '100%'}
      fit="fill"
      style={{ borderRadius: props.borderRadius ?? 0 }}
    />
  )
}

export default MyImage
