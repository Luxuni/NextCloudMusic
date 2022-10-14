import { Ellipsis, Skeleton } from 'antd-mobile'
import { NextPageWithLayout } from '../../../../pages/_app'
import { customizeRequestType } from '../../../services'
import { getSearchHotDetailType, getSearchHotTopicParamsType, getSearchHotTopicType } from '../../../services/search'

type SearchListItemProps = {
  request: customizeRequestType<getSearchHotTopicParamsType & any, getSearchHotTopicType & getSearchHotDetailType>
}

const SearchListItem: NextPageWithLayout<SearchListItemProps> = (props) => {
  const { data, isLoading, isError } = props.request()
  if (isLoading) return <Skeleton.Paragraph lineCount={20} animated />

  return (
    <div className="pb-4 pr-4">
      {data.data?.map((item, index) => (
        <div className="pt-4" key={item.score}>
          <div className={index < 3 ? 'float-left w-8 h-4 text-red-800' : 'float-left w-8 h-4'}>{index + 1}</div>
          <div>
            <Ellipsis direction="end" content={item.searchWord} />
          </div>
        </div>
      ))}
      {data.hot?.map((item, index) => (
        <div className="pt-4" key={item.actId}>
          <div className={index < 3 ? 'float-left w-8 h-4 text-red-800' : 'float-left w-8 h-4'}>{index + 1}</div>
          <div>
            <Ellipsis direction="end" content={item.title} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchListItem
