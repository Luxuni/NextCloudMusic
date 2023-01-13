import { Ellipsis } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useAppSelector } from '../../../app/hooks'
import { selectNeedPlayedSong } from '../../../features/player/playerSlice'

type BigPlayerHeaderProps = {
  handleCloseBigPlayerPopup: () => void
}

const BigPlayerHeader: NextComponentType<{}, {}, BigPlayerHeaderProps> = (props) => {
  const needPlayedSongMessage = useAppSelector(selectNeedPlayedSong)
  return (
    <div className="h-full flex items-center justify-between">
      {/* left */}
      {/* left --> close arrow */}
      <div className="h-full w-1/6 flex items-center justify-center" onClick={props.handleCloseBigPlayerPopup}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      {/* middle */}
      {/* middle -->singer and name */}
      <div className="text-white flex flex-col w-2/3 items-center justify-center">
        <div className="text-base font-black">{needPlayedSongMessage.name}</div>
        <div className="text-sm">
          <Ellipsis
            content={(needPlayedSongMessage.artists ?? needPlayedSongMessage.ar).map((item) => item.name).join(' ')}
          />
        </div>
      </div>
      {/* right */}
      {/* right --> share */}
      <div className="h-full w-1/6 flex items-center justify-center">
        <div className="h-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BigPlayerHeader
