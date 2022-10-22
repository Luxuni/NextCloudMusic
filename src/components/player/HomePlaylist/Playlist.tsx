import { Ellipsis } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { removeOneSongFromPlayer, selectPlayer, selectPlayerMap } from '../../../features/player/playerSlice'
import { DailySongsType } from '../../../services/recommendList'
import { addOneSongAndJumpTo } from '../../playlist/tools'

const Playlist: NextComponentType = () => {
  const dispatch = useAppDispatch()
  const playlist = useAppSelector(selectPlayer)
  const playListMap = useAppSelector(selectPlayerMap)

  const handleDeleteOneSongInPlaylist = (SongMessage: DailySongsType) => {
    dispatch(removeOneSongFromPlayer(SongMessage))
  }

  const handleClickItem = async (item: DailySongsType) => {
    addOneSongAndJumpTo(item, playListMap, dispatch)
  }
  return (
    <div className="w-full ">
      {playlist.map((item, index) => (
        <div
          className={index === 0 ? 'w-full flex items-center pt-2 pb-2' : 'w-full flex items-center pt-2 pb-2 mt-4'}
          key={item.id}
          onClick={(e) => {
            //阻止事件冒泡
            e.stopPropagation()
            handleClickItem(item)
          }}>
          {/* song name */}
          <div className="w-2/5">
            <Ellipsis direction="end" content={item.name} />
          </div>
          {/* song artist */}
          <div className="w-2/5">
            <Ellipsis direction="end" content={item.ar.map((item) => item.name).join(' ')} />
          </div>
          <div
            className="w-1/5 flex items-center justify-end"
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteOneSongInPlaylist(item)
            }}>
            {/* option delete */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Playlist
