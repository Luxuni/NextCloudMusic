import { NextComponentType } from 'next'
import { useAppSelector } from '../../../app/hooks'
import { selectNeedPlayedSong } from '../../../features/player/playerSlice'
import MyImage from '../../public/MyImage'
import { animated, useSpring } from 'react-spring'

type BigPlayerBodyProps = {
  rotationAnimationState: boolean
}

const BigPlayerBody: NextComponentType<{}, {}, BigPlayerBodyProps> = (props) => {
  const styles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    config: { duration: 5000 },
    pause: props.rotationAnimationState,
    to: { rotateZ: 360 },
  })

  const needPlayedSongMessage = useAppSelector(selectNeedPlayedSong)
  return (
    <animated.div style={{ ...styles }} className="h-96 w-96 rounded-full flex items-center justify-center bg-black">
      <MyImage src={needPlayedSongMessage.al?.picUrl} height="16rem" width="16rem" borderRadius="16rem" />
    </animated.div>
  )
}

export default BigPlayerBody
