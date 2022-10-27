import { NextComponentType } from 'next'
import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react'
import BigPlayerBody from './BigPlayerBody'
import BigPlayerHeader from './BigPlayerHeader'
import Options from './Options'
import PlaybackControls from './PlayBackControls'

type BigPlayerProps = {
  handleCloseBigPlayerPopup: () => void
  rotationAnimationState: boolean
  setIsPlay: Dispatch<SetStateAction<boolean>>
  Audio: MutableRefObject<HTMLAudioElement | null> | undefined
  children?: ReactNode
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
      {/* bottom */}
      <div className="flex flex-1 flex-col justify-between">
        {/* options */}
        <div className="h-1/6 mt-4">
          <Options/>
        </div>
        {/* Playback controls */}
        <div className="h-2/3">
          <PlaybackControls
            rotationAnimationState={props.rotationAnimationState}
            setIsPlay={props.setIsPlay}
            Audio={props.Audio}>
            {props.children}
          </PlaybackControls>
        </div>
      </div>
    </div>
  )
}

export default BigPlayer
