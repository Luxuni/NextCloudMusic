import { Skeleton } from 'antd-mobile'
import { UndoOutline } from 'antd-mobile-icons'
import { NextPageWithLayout } from '../../../../pages/_app'
import { getSearchHot } from '../../../services/search'

const HotSearch: NextPageWithLayout = () => {
  const { data, isLoading, isError } = getSearchHot()
  if (isLoading) return <Skeleton.Paragraph lineCount={2} animated />

  return (
    <div>
      {/* tab */}
      <div className="flex items-center justify-between pl-8 pr-8">
        <span className="text-xl">推荐</span>
        <span>
          <UndoOutline fontSize={20} />
        </span>
      </div>
      {/* hot searchItem */}
      <div className="flex overflow-y-scroll pl-4 pr-4 mt-4">
        {data?.result.hots.map((item, index) => (
          <div
            key={item.first}
            className={
              index === data.result.hots.length - 1
                ? 'text-base shrink-0 rounded-full bg-gray-200'
                : 'text-base shrink-0 rounded-full bg-gray-200 mr-4'
            }>
            <div className="pl-3 pr-3 pt-1 pb-1">{item.first}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotSearch
