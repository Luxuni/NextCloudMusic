import { Ellipsis } from 'antd-mobile'
import { NextComponentType } from 'next'
import { Dispatch, SetStateAction } from 'react'
import { PlaylistDetailType } from '../../services/playlist'
import PlaylistCover from './PlaylistCover'

type BigCoverProps = {
  data: PlaylistDetailType
  setIsShowBigCover: Dispatch<SetStateAction<boolean>>
  className?: string
}

const BigCover: NextComponentType<{}, {}, BigCoverProps> = (props) => {
  const { data, setIsShowBigCover } = props
  return (
    <div
      style={{ backgroundImage: `url(${data.playlist.coverImgUrl})` }}
      className={'h-screen w-screen fixed top-0 left-0 ' + props.className}>
      <div
        className="h-screen w-screen backdrop-blur-xl flex flex-col"
        onClick={(e) => {
          e.stopPropagation()
          setIsShowBigCover(false)
        }}>
        {/* head and close icon */}
        <div className="h-12 flex justify-end items-center pr-4">
          <div className="h-full aspect-square mr-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        {/* cover */}
        <div className="flex items-center justify-center mt-4">
          <PlaylistCover
            coverImgUrl={data.playlist.coverImgUrl}
            playCount={data.playlist.playCount}
            className="relative h-48 w-48 rounded-xl"
          />
        </div>
        {/* name */}
        <div>
          <Ellipsis content={data.playlist.name} className="text-white text-center text-xl mt-4 mb-4 pr-4 pl-4" />
        </div>
        <div className="divider"></div>
        {/* Label */}
        <div className="text-white pr-4 pl-4 mb-4">
          标签 ：
          {data.playlist.tags.map((tag, index) => {
            return (
              <button key={index} className="btn btn-active btn-ghost btn-xs mr-4">
                {tag}
              </button>
            )
            // <span className="text-white text-sm mr-2">{tag}</span>
          })}
        </div>
        {/* description */}
        <div className="flex-1 p-4 text-white">
          <Ellipsis content={data.playlist.description} rows={10} />
        </div>
      </div>
    </div>
  )
}

export default BigCover
