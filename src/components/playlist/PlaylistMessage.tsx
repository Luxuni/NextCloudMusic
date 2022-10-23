import { Ellipsis } from 'antd-mobile'
import { NextComponentType } from 'next'
import MyImage from '../public/MyImage'
import PlaylistCover from './PlaylistCover'

type PlaylistMessageProps = {
  coverImgUrl: string
  playCount: number
  name: string
  avatarUrl: string
  nickname: string
  onClick?: () => void
}

const PlaylistMessage: NextComponentType<{}, {}, PlaylistMessageProps> = (props) => {
  return (
    <>
      <div className="flex">
        {/* left image */}
        <PlaylistCover coverImgUrl={props.coverImgUrl} playCount={props.playCount} onClick={props.onClick} />
        {/* right message */}
        <div className="text-white flex-1 h-32">
          {/* name */}
          <div className="text-lg">
            <Ellipsis content={props.name} />
          </div>
          {/* creater image and name */}
          <div className="flex items-end mt-4">
            <MyImage src={props.avatarUrl} height="2rem" width="2rem" borderRadius="10rem" />
            <span className="ml-2">{props.nickname}</span>
            <button className="btn btn-xs btn-active btn-ghost ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              关注
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaylistMessage
