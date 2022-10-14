import { NextPageWithLayout } from '../../../../pages/_app'
import { DailySongsType } from '../../../services/recommendList'
import RecommendSongGroupItem from './RecommendSongGroupItem'

type RecommendSongGroupType = {
  data: DailySongsType[]
  className?: string
}

const RecommendSongGroup: NextPageWithLayout<RecommendSongGroupType> = (props) => {
  return (
    <div className={'flex flex-col shrink-0 w-5/6 h-full ' + props.className}>
      {props.data.map((item, index) => (
        <RecommendSongGroupItem key={item.id} data={item} className={index === 0 ? '' : 'mt-4'} />
      ))}
    </div>
  )
}

export default RecommendSongGroup
