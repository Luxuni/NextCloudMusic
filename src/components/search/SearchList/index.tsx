import { NextPageWithLayout } from '../../../../pages/_app'
import { getSearchHotDetail, getSearchHotTopic } from '../../../services/search'
import SearchListItem from './SearchListItem'
import SearchListTabBar from './SearchListTabBar'

const SearchListMessages = new Map([
  [
    0,
    {
      title: '热搜榜',
      hasRightBtn: true,
      request: getSearchHotDetail,
    },
  ],
  [
    1,
    {
      title: '话题榜',
      hasRightBtn: false,
      request: getSearchHotTopic,
    },
  ],
])

const SearchList: NextPageWithLayout = () => {
  return (
    <div className="flex overflow-x-scroll">
      {Array.from(SearchListMessages).map(([key, value]) => {
        return (
          <div className="w-3/5 shrink-0 pr-4 pl-4 mr-4 ml-4 rounded-2xl bg-gray-200" key={key}>
            {/* tab bar */}
            <div className="border-b-2 border-slate-400">
              <SearchListTabBar {...value} />
            </div>
            {/* search list */}
            <div>
              <SearchListItem request={value.request as any} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SearchList
