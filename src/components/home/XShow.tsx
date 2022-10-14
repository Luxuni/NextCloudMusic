import { Skeleton } from 'antd-mobile'
import { NextPageWithLayout } from '../../../pages/_app'
import { customizeRequestType } from '../../services'
import { getRecommendDailyList, RecommendListParams, RecommendListType } from '../../services/recommendList'
import ShowItem from '../public/ShowItem'
import YShowItem from '../public/YShowItem'
import ShowTabBar from './ShowTabBar'

type XShowType = {
  title: string
  request: customizeRequestType<RecommendListParams, RecommendListType>
  isShowYFirst?: boolean
}

const XShow: NextPageWithLayout<XShowType> = (props) => {
  const { data, isLoading, isError } = props.request({ limit: 5 })
  if (isLoading)
    return (
      <Skeleton
        animated
        style={{ height: '16rem', width: '100%', borderRadius: '1rem', marginLeft: '1rem', marginRight: '1rem' }}
      />
    )

  return (
    <div className="pl-4 pr-4 w-full">
      {/* tab */}
      <ShowTabBar title={props.title} />
      {/* area to show */}
      <div className="flex w-full overflow-x-scroll">
        {props.isShowYFirst && (
          <div className="shrink-0 pr-4">
            <YShowItem request={getRecommendDailyList} />
          </div>
        )}
        {data.result.map((item: any, index: number) => {
          return (
            <div key={item.id} className={index === data.result.length - 1 ? 'shrink-0' : 'shrink-0 pr-4'}>
              <ShowItem image={item.picUrl} name={item.name} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default XShow
