import { Ellipsis, Popup } from 'antd-mobile'
import { NextComponentType } from 'next'
import { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectPlayer, selectPlayMode } from '../../features/player/playerSlice'
import MyImage from '../public/MyImage'
import HomePlaylist from './HomePlaylist'
import MyAudio, { MyAudioRefType } from './MyAudio'

type PlayPropsType = {
  bottom: string
}

const Player: NextComponentType<{}, {}, PlayPropsType> = (props) => {
  const player = useAppSelector(selectPlayer)
  const isShowPlayer = player.length > 0

  //MyAudio state
  const [isPlay, setIsPlay] = useState(false)
  const MyAudioRef = useRef<MyAudioRefType | null>(null)

  //playlist btn click --> playlist popup
  const [isShowPlaylist, setIsShowPlaylist] = useState(false)

  const handlePlaylistBtnClick: ReactEventHandler<HTMLDivElement> = () => {
    setIsShowPlaylist(true)
  }

  const handleClickOnMask: ReactEventHandler<HTMLDivElement> = () => {
    setIsShowPlaylist(false)
  }

  // handle play pointer
  const [playPointer, setPlayPointer] = useState(0)
  // handle song on ended
  const playMode = useAppSelector(selectPlayMode)

  const handlePlayModeMap = new Map([
    [
      'loop',
      () => {
        if (playPointer === player.length - 1) {
          setPlayPointer(0)
        } else {
          setPlayPointer(playPointer + 1)
        }
      },
    ],
    [
      'random',
      () => {
        const randomNum = Math.floor(Math.random() * player.length)
        setPlayPointer(randomNum)
      },
    ],
    [
      'single',
      () => {
        setPlayPointer(playPointer)
      },
    ],
  ])

  const handleSongOnEnded: ReactEventHandler<HTMLAudioElement> = (e) => {
    handlePlayModeMap.get(playMode)!()
    MyAudioRef.current!.makeAudioPlay(e.currentTarget)
  }

  useEffect(() => {
    if (player.length === 0) {
      setIsShowPlaylist(false)
    }
  }, [player.length])
  return (
    <>
      {isShowPlayer && (
        <>
          {/* <audio ref={Audio} src={player[0].url} onCanPlay={handleSongCanPaly}></audio> */}
          <MyAudio
            ref={(ref) => (MyAudioRef.current = ref)}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            src={player[playPointer].url!}
            handleSongOnEnded={handleSongOnEnded}
          />
          {/* playlist */}
          <Popup visible={isShowPlaylist} onMaskClick={handleClickOnMask} bodyStyle={{ height: '70vh' }}>
            {/* playlist content */}
            <HomePlaylist />
          </Popup>
          <div className={'flex sticky w-full h-12 bg-gray-200 ' + props.bottom}>
            {/* left */}
            <div className="h-full flex items-center justify-around w-3/5">
              {/* image */}
              <MyImage src={player[0].al.picUrl} height="2rem" width="2rem" borderRadius="100%" className="ml-2 mr-2" />
              {/* name and at*/}
              <div className="flex items-center justify-around pl-4">
                <Ellipsis direction="end" content={player[0].name} className="pr-4 text-[0.5rem]" />
                <Ellipsis
                  direction="end"
                  content={player[0].ar.map((item) => item.name).join(' ')}
                  className="text-[0.5rem]"
                />
              </div>
            </div>
            {/* right icon */}
            <div className="flex items-center justify-end w-2/5">
              {/* play-btn */}
              {isPlay ? (
                // pause
                <div
                  className="h-full aspect-square flex items-center justify-center"
                  onClick={() => {
                    setIsPlay(false)
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                // play
                <div
                  className="h-full aspect-square flex items-center justify-center"
                  onClick={() => {
                    setIsPlay(true)
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              {/* playlist-btn */}
              <div className="h-full aspect-square flex items-center justify-center" onClick={handlePlaylistBtnClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Player
