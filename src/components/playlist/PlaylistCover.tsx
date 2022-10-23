import { NextComponentType } from 'next'
import MyImage from '../public/MyImage'

type PlaylistCoverProps = {
  coverImgUrl: string
  playCount: number
  onClick?: () => void
  className?: string
}

const PlaylistCover: NextComponentType<{}, {}, PlaylistCoverProps> = (props) => {
  return (
    <div className={props.className || 'relative mr-4 h-32 w-32'} onClick={props.onClick}>
      {/* playcount */}
      <div className="absolute flex items-center justify-center top-2 right-2 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>
        {props.playCount > 10000 ? `${Math.floor(props.playCount / 10000)}万` : props.playCount}
      </div>
      <MyImage src={props.coverImgUrl} height="100%" width="100%" borderRadius="1rem" />
    </div>
  )
}

export default PlaylistCover
