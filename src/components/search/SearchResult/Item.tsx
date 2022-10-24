import { NextComponentType } from 'next'
import { DailySongsType } from '../../../services/recommendList'

type SearchResultProps = {
  data: DailySongsType
  className: string
}

const SearchResultItem: NextComponentType<{}, {}, SearchResultProps> = (props) => {
  return <div className={'h-12 w-full flex shrink-0 ' + props.className}>SearchResult</div>
}

export default SearchResultItem
