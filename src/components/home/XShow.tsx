import { Skeleton } from 'antd-mobile'
import { MoreOutline, RightOutline } from 'antd-mobile-icons'
import { NextPageWithLayout } from '../../../pages/_app'
import { customizeRequestType } from '../../services'
import { getRecommendDailyList } from '../../services/recommendList'
import ShowItem from '../public/ShowItem'
import YShowItem from '../public/YShowItem'

type XShowType = {
  title: string
  request: customizeRequestType
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
      <div className="h-8 flex items-center justify-between mb-4">
        {/* left */}
        <div className="flex items-center">
          <div className="text-xl">{props.title}</div>
          <RightOutline fontSize={18} />
        </div>
        {/* right ... */}
        <div>
          <MoreOutline fontSize={24} />
        </div>
      </div>
      {/* area to show */}
      <div className="flex w-full overflow-x-scroll">
        <div className="shrink-0 pr-4">
          <YShowItem request={getRecommendDailyList} />
        </div>
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
