import { Skeleton } from 'antd-mobile'
import { NextPageWithLayout } from '../../../../pages/_app'
import { customizeRequestType } from '../../../services'
import { RecommendSongsType } from '../../../services/recommendList'
import ShowTabBar from '../ShowTabBar'
import RecommendSongGroup from './RecommendSongGroup'

type RecommendSongGroupType = {
  request: customizeRequestType<any, RecommendSongsType>
  title: string
}

const RecommendSong: NextPageWithLayout<RecommendSongGroupType> = (props) => {
  const { data, isLoading, isError } = props.request()
  if (isLoading)
    return (
      <div className="pl-4 pr-4 w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={index === 0 ? 'flex' : 'flex mt-4'}>
            {/* image */}
            <Skeleton animated style={{ height: '4rem', width: '4rem' }} />
            {/* message */}
            <div className="flex flex-col justify-around pl-4 w-4/5">
              <Skeleton animated style={{ height: '1rem', width: '60%' }} />
              <Skeleton animated style={{ height: '1rem', width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    )

  const groupMap: Map<number, typeof data.data.dailySongs> = new Map()

  //data.data.dailySongs --> groups of three
  data.data.dailySongs.forEach((item, index) => {
    const groupIndex = Math.floor(index / 3)
    if (!groupMap.has(groupIndex)) {
      groupMap.set(groupIndex, [])
    }
    groupMap.get(groupIndex)?.push(item)
  })

  return (
    <div className="pl-4 pr-4 w-full">
      {/* tab */}
      <ShowTabBar title={props.title} />
      {/* area to show */}
      <div className="flex w-full overflow-x-scroll">
        {/* show group */}
        {Array.from(groupMap).map((item, index) => {
          return (
            <RecommendSongGroup key={item[0]} data={item[1]} className={index === groupMap.size - 1 ? '' : 'mr-4'} />
          )
        })}
      </div>
    </div>
  )
}

export default RecommendSong
