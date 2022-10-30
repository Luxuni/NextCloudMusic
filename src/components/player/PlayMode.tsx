import { NextComponentType } from 'next'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectPlayModeNumber, playModeNumberAddition } from '../../features/player/playerSlice'

const PlayModeIconMap = new Map([
  [
    // 'loop',
    0,
    {
      icon: (heightName?: string, widthName?: string) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={heightName || widthName ? `${heightName} ${widthName}` : 'h-6 w-6'}>
          <path
            fillRule="evenodd"
            d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 013.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 00-4.392-4.392 49.422 49.422 0 00-7.436 0A4.756 4.756 0 003.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 101.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 013.01-3.01c1.19-.09 2.392-.135 3.605-.135zm-6.97 6.22a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 004.392 4.392 49.413 49.413 0 007.436 0 4.756 4.756 0 004.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 00-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 01-3.01 3.01 47.953 47.953 0 01-7.21 0 3.256 3.256 0 01-3.01-3.01 47.759 47.759 0 01-.1-1.759L6.97 15.53a.75.75 0 001.06-1.06l-3-3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: '列表循环',
    },
  ],
  [
    // 'random',
    1,
    {
      icon: (heightName?: string, widthName?: string) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={heightName || widthName ? `${heightName} ${widthName}` : 'h-6 w-6'}>
          <path
            fillRule="evenodd"
            d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: '随机播放',
    },
  ],
  [
    // 'single',
    2,
    {
      icon: (heightName?: string, widthName?: string) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={heightName || widthName ? `${heightName} ${widthName}` : 'h-6 w-6'}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" />
        </svg>
      ),
      title: '单曲播放',
    },
  ],
])

type PlayModeProps = {
  className?: string
  isShowTitle?: boolean
  heightName?: string
  widthName?: string
}

const PlayMode: NextComponentType<{}, {}, PlayModeProps> = (props) => {
  const dispatch = useAppDispatch()
  const playModeNumber = useAppSelector(selectPlayModeNumber)

  // 迭代器迭代输出0,1,2
  const playModeNumberIterator = (function* (num: number) {
    let i = num
    while (true) {
      i = (i + 1) % 3
      dispatch(playModeNumberAddition(i))
      yield i
    }
  })(playModeNumber)

  const handleClickPlayModeOption = () => {
    playModeNumberIterator.next()
  }
  return (
    <div className="flex h-full items-center justify-center" onClick={handleClickPlayModeOption}>
      {/* left--> play mode */}
      <div className={`flex items-center justify-start ${props.className}`}>
        {PlayModeIconMap.get(playModeNumber)?.icon(props.heightName, props.widthName)}
      </div>
      {/* mode title */}
      {props.isShowTitle && <span>{PlayModeIconMap.get(playModeNumber)?.title}</span>}
    </div>
  )
}

export default PlayMode
