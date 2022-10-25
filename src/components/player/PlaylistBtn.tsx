import { Popup } from 'antd-mobile'
import { NextComponentType } from 'next'
import { ReactEventHandler, useState } from 'react'
import HomePlaylist from './HomePlaylist'

type PlaylistBtnProps = {
  className?: string
}

const PlaylistBtn: NextComponentType<{}, {}, PlaylistBtnProps> = (props) => {
  //playlist btn click --> playlist popup
  const [isShowPlaylist, setIsShowPlaylist] = useState(false)

  const handlePlaylistBtnClick = () => {
    setIsShowPlaylist(true)
  }

  const handleClickOnMask: ReactEventHandler<HTMLDivElement> = () => {
    setIsShowPlaylist(false)
  }
  return (
    <>
      {/* playlist */}
      <Popup
        visible={isShowPlaylist}
        onMaskClick={handleClickOnMask}
        bodyStyle={{ height: '70vh', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}>
        {/* playlist content */}
        <HomePlaylist />
      </Popup>
      <div
        className="h-full flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation()
          handlePlaylistBtnClick()
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={props.className ? props.className : 'w-6 h-6'}>
          <path
            fillRule="evenodd"
            d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </>
  )
}
export default PlaylistBtn
