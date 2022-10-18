import { Ellipsis } from 'antd-mobile'
import { NextPageWithLayout } from '../../../../pages/_app'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { addOneSongToPlayer, selectPlayerMap } from '../../../features/player/playerSlice'
import { DailySongsType } from '../../../services/recommendList'
import { getSongUrl } from '../../../services/song/url'
import MyImage from '../../public/MyImage'

type RecommendSongGroupItemType = {
  data: DailySongsType
  className?: string
}

const RecommendSongGroupItem: NextPageWithLayout<RecommendSongGroupItemType> = (props) => {
  const dispatch = useAppDispatch()
  const playlistMap = useAppSelector(selectPlayerMap)

  const handleClickRecommendSongPlayBth = async () => {
    if (!playlistMap.has(props.data.id) && !props.data.url) {
      const res = await getSongUrl({ id: props.data.id })
      props.data.url = res.data.data[0].url
      dispatch(addOneSongToPlayer(props.data))
    } else if (!playlistMap.has(props.data.id)) {
      dispatch(addOneSongToPlayer(props.data))
    }
    // add to playlist
  }

  return (
    <div className={'h-16 w-full flex justify-between items-center ' + props.className}>
      {/* left */}
      <div className="flex h-full w-4/5">
        {/* left */}
        {/* image */}
        <div className="h-full aspect-square">
          <MyImage src={props.data.al.picUrl} />
        </div>
        {/* right */}
        <div className="pl-4 w-2/3">
          {/* name */}
          <Ellipsis direction="end" content={props.data.name} />
          {/* singer */}
          <div className="text-xs mt-4">
            <Ellipsis direction="end" content={props.data.ar.map((item) => item.name).join(' ')} />
          </div>
        </div>
      </div>
      {/* right play icon */}
      <div className="h-full w-1/5 flex items-center justify-center" onClick={handleClickRecommendSongPlayBth}>
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      </div>
    </div>
  )
}

export default RecommendSongGroupItem
