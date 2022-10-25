import { NextComponentType } from 'next'
import BigPlayerHeader from './BigPlayerHeader'

type BigPlayerProps = {
  handleCloseBigPlayerPopup: () => void
}

const BigPlayer: NextComponentType<{}, {}, BigPlayerProps> = (props) => {
  return (
    <div className="flex flex-col">
      {/* head */}
      <div className="h-16">
        <BigPlayerHeader handleCloseBigPlayerPopup={props.handleCloseBigPlayerPopup} />
      </div>
    </div>
  )
}

export default BigPlayer
