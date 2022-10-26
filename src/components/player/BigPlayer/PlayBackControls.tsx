import { Slider, Toast } from 'antd-mobile'
import { NextComponentType } from 'next'
import { Dispatch, MutableRefObject, ReactEventHandler, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { handleForcePlayNextTrack, handleForcePlayPreviousTrack } from '../../../features/player/playerSlice'
import PlaylistBtn from '../PlaylistBtn'
import PlayMode from '../PlayMode'

type PlayBackControlsProps = {
  rotationAnimationState: boolean
  setIsPlay: Dispatch<SetStateAction<boolean>>
  Audio: MutableRefObject<HTMLAudioElement | null> | undefined
}

const PlaybackControls: NextComponentType<{}, {}, PlayBackControlsProps> = (props) => {
  const dispatch = useDispatch()

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

  const handleClickPlayOrPause: ReactEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    props.setIsPlay(props.rotationAnimationState)
  }
  return (
    <div className="flex flex-col h-full">
      {/* range */}
      <div className="flex items-center pl-2 pr-2">
        <div>00:00</div>
        <div className="w-5/6">
          <Slider
            className=""
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
      {/* bottom */}
      <div className="flex-1 flex items-center justify-between">
        {/* left --> play mode */}
        <div className="h-full w-1/5">
          <PlayMode isShowTitle={false} className="text-white" heightName="h-8" widthName="w-8" />
        </div>
        {/* middle --> previous , next and play or pause */}
        <div className="h-full w-3/5 flex text-white">
          {/* previous icon */}
          <div
            className="h-full w-1/4 flex items-center justify-center"
            onClick={() => {
              dispatch(handleForcePlayPreviousTrack(props.Audio))
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
              />
            </svg>
          </div>
          {/* play or pause icon */}
          <div className="h-full w-1/2 flex items-center justify-center" onClick={handleClickPlayOrPause}>
            {props.rotationAnimationState ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          {/* next icon */}
          <div
            className="h-full w-1/4 flex items-center justify-center"
            onClick={() => {
              dispatch(handleForcePlayNextTrack(props.Audio))
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
              />
            </svg>
          </div>
        </div>
        {/* right --> playlist */}
        <div className="h-full w-1/5">
          <PlaylistBtn className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  )
}

export default PlaybackControls
