import React, { Dispatch, ReactEventHandler, SetStateAction, useEffect, useImperativeHandle, useRef } from 'react'

export type MyAudioRefType = {
  Audio: React.MutableRefObject<HTMLAudioElement | null>
  makeAudioPlay: (target?: EventTarget & HTMLAudioElement) => void
  makeAudioPause: (target?: EventTarget & HTMLAudioElement) => void
}

const MyAudio = React.forwardRef<
  MyAudioRefType,
  {
    isPlay: boolean
    setIsPlay: Dispatch<SetStateAction<boolean>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    src: string
    handleSongOnEnded: React.ReactEventHandler<HTMLAudioElement>
  }
>((props, ref) => {
  const Audio = useRef<null | HTMLAudioElement>(null)

  const makeAudioPlay = (target?: EventTarget & HTMLAudioElement) => {
    if (target) {
      target.play()
    } else {
      Audio.current!.play()
    }
    props.setIsPlay(true)
  }

  const makeAudioPause = (target?: EventTarget & HTMLAudioElement) => {
    if (target) {
      if (!target.paused) {
        target.pause()
        props.setIsPlay(false)
      }
    } else {
      if (!Audio.current!.paused) {
        Audio.current!.pause()
        props.setIsPlay(false)
      }
    }
  }

  const handleSongCanPaly: ReactEventHandler<HTMLAudioElement> = (e) => {
    props.setIsLoading(false)
    makeAudioPlay(e.currentTarget)
  }

  useEffect(() => {
    if (props.isPlay) {
      makeAudioPlay(Audio.current!)
    } else {
      makeAudioPause(Audio.current!)
    }
  }, [props.isPlay, props.src])

  useImperativeHandle(ref, () => ({
    Audio,
    makeAudioPlay,
    makeAudioPause,
  }))

  return (
    <audio
      ref={(ref) => (Audio.current = ref)}
      src={props.src}
      onCanPlayThrough={handleSongCanPaly}
      onEnded={props.handleSongOnEnded}
    />
  )
})
export default MyAudio
