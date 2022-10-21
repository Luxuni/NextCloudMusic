import { Ellipsis } from 'antd-mobile'
import { NextComponentType } from 'next'
import MyImage from '../public/MyImage'

type PlaylistMessageProps = {
  coverImgUrl: string
  playCount: number
  name: string
  avatarUrl: string
  nickname: string
}

const PlaylistMessage: NextComponentType<{}, {}, PlaylistMessageProps> = (props) => {
  return (
    <div className="flex">
      {/* left image */}
      <div className="relative mr-4 h-32">
        {/* playcount */}
        <div className="absolute flex items-center justify-center top-2 right-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-white">
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
          {props.playCount > 10000 ? `${Math.floor(props.playCount / 10000)}万` : props.playCount}
        </div>
        <MyImage src={props.coverImgUrl} height="8rem" width="8rem" borderRadius="1rem" />
      </div>
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
  )
}

export default PlaylistMessage
