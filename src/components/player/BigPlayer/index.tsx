import { NextComponentType } from 'next'
import { useState } from 'react'
import BigPlayerBody from './BigPlayerBody'
import BigPlayerHeader from './BigPlayerHeader'

type BigPlayerProps = {
  handleCloseBigPlayerPopup: () => void
  rotationAnimationState: boolean
}

const BigPlayer: NextComponentType<{}, {}, BigPlayerProps> = (props) => {
  return (
    <div className="h-full flex flex-col">
      {/* head */}
      <div className="h-[10vh]">
        <BigPlayerHeader handleCloseBigPlayerPopup={props.handleCloseBigPlayerPopup} />
      </div>
      {/* body */}
      <div className="h-[60vh] flex items-center justify-center">
        <BigPlayerBody rotationAnimationState={props.rotationAnimationState} />
      </div>
    </div>
  )
}

export default BigPlayer
