import { NextComponentType } from 'next'
import { getQRKey, QRCreat } from '../../services/login'
import { HOC } from '../player/HOC'

type OptionsProps = {
  unikey?: string
}

function PushIntoUnikey(WrapComponent: NextComponentType<{}, {}, Required<OptionsProps>>) {
  return function PushIntoUnikeyIndex() {
    const { data, isLoading, isError } = getQRKey()
    if (isLoading) return <div></div>
    console.log(data)

    return <WrapComponent unikey={data.unikey} />
  }
}

const QRImage: NextComponentType<{}, {}, Required<OptionsProps>> = (props) => {
  const { data, isLoading, isError } = QRCreat({ key: props.unikey })
  if (isLoading) return <div></div>
  console.log(data)

  return <img className="h-44 w-44" src={data.data.qrimg} />
}

export default HOC<OptionsProps>((props) => props['unikey'])(PushIntoUnikey(QRImage))
