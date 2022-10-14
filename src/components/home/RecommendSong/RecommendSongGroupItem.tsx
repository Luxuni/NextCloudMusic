import { Ellipsis } from 'antd-mobile'
import { NextPageWithLayout } from '../../../../pages/_app'
import { DailySongsType } from '../../../services/recommendList'
import MyImage from '../../public/MyImage'

type RecommendSongGroupItemType = {
  data: DailySongsType
  className?: string
}

const RecommendSongGroupItem: NextPageWithLayout<RecommendSongGroupItemType> = (props) => {
  return (
    <div className={'h-16 w-full flex justify-between items-center ' + props.className}>
      {/* left */}
      <div className="flex h-full w-full">
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      </div>
    </div>
  )
}

export default RecommendSongGroupItem
