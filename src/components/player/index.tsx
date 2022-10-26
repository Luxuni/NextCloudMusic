import { useUpdateEffect } from 'ahooks'
import { DotLoading, Ellipsis, Popup, Slider, Toast } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { handleSongOnEnded, selectNeedPlayedSong, selectPlayer } from '../../features/player/playerSlice'
import MyImage from '../public/MyImage'
import BigPlayer from './BigPlayer'
import MyAudio, { MyAudioRefType } from './MyAudio'
import PlaylistBtn from './PlaylistBtn'

type PlayPropsType = {
  bottom: string
}

const Player: NextComponentType<{}, {}, PlayPropsType> = (props) => {
  const player = useAppSelector(selectPlayer)
  const isShowPlayer = player.length > 0
  const needPlayedSong = useAppSelector(selectNeedPlayedSong)
  const dispatch = useAppDispatch()

  //MyAudio state
  const [isPlay, setIsPlay] = useState(false)
  const MyAudioRef = useRef<MyAudioRefType | null>(null)

  //playlist btn click --> playlist popup
  const [isShowBigPlayerPopup, setIsShowBigPlayerPopup] = useState(false)

  const handleClickPlayer = () => {
    setIsShowBigPlayerPopup(true)
  }

  const handleCloseBigPlayerPopup = () => {
    setIsShowBigPlayerPopup(false)
  }

  // handle loading
  const [isLoading, setIsLoading] = useState(true)

  const toastValue = (value: number | number[]) => {
    let text = ''
    if (typeof value === 'number') {
      text = `${value}`
    } else {
      text = `[${value.join(',')}]`
    }
    Toast.show(`当前选中值为：${text}`)
    console.log(value)
  }

  useUpdateEffect(() => {
    setIsLoading(true)
  }, [needPlayedSong?.url])
  return (
    <>
      {isShowPlayer && (
        <>
          <MyAudio
            ref={(ref) => (MyAudioRef.current = ref)}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            src={needPlayedSong.url!}
            handleSongOnEnded={() => {
              dispatch(handleSongOnEnded(MyAudioRef.current?.Audio))
            }}
            setIsLoading={setIsLoading}
          />
          {/* bigPlayer */}
          <Popup
            visible={isShowBigPlayerPopup}
            onMaskClick={handleCloseBigPlayerPopup}
            bodyStyle={{ height: '100vh', background: `url(${needPlayedSong.al.picUrl})` }}>
            <div className="h-screen w-screen backdrop-blur-xl">
              <BigPlayer
                handleCloseBigPlayerPopup={handleCloseBigPlayerPopup}
                rotationAnimationState={!isPlay}
                setIsPlay={setIsPlay}
                Audio={MyAudioRef.current?.Audio}>
                <div className="flex items-center pl-2 pr-2">
                  <div>00:00</div>
                  <div className="w-5/6">
                    <Slider
                      style={{
                        '--fill-color': '#DBC8AC',
                      }}
                      icon={<></>}
                      defaultValue={40}
                      onAfterChange={toastValue}
                    />
                  </div>
                  <div>00:00</div>
                </div>
              </BigPlayer>
            </div>
          </Popup>
          {isLoading ? (
            <div
              className={'flex sticky w-full h-12 bg-gray-200 justify-around items-center shadow-xl ' + props.bottom}>
              <DotLoading />
              <DotLoading />
              <DotLoading />
            </div>
          ) : (
            <div
              className={'flex sticky w-full h-12 bg-gray-200 shadow-xl ' + props.bottom}
              onClick={(e) => {
                e.stopPropagation()
                handleClickPlayer()
              }}>
              {/* left */}
              <div className="h-full flex items-center justify-around w-3/5">
                {/* image */}
                <MyImage
                  src={needPlayedSong.al.picUrl}
                  height="2rem"
                  width="2rem"
                  borderRadius="100%"
                  className="ml-2 mr-2"
                />
                {/* name and at*/}
                <div className="flex items-center justify-around pl-4">
                  <Ellipsis direction="end" content={needPlayedSong.name} className="pr-4 text-[0.5rem]" />
                  <Ellipsis
                    direction="end"
                    content={needPlayedSong.ar.map((item) => item.name).join(' ')}
                    className="text-[0.5rem]"
                  />
                </div>
              </div>
              {/* right icon */}
              <div className="flex items-center justify-end w-2/5 pr-4">
                {/* play-btn */}
                {isPlay ? (
                  // pause
                  <div
                    className="h-full aspect-square flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation()
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
                    onClick={(e) => {
                      e.stopPropagation()
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
                <PlaylistBtn />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Player
