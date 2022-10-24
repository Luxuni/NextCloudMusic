import { useDebounceEffect } from 'ahooks'
import { NextComponentType } from 'next'
import { useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectPlayerMap } from '../../../features/player/playerSlice'
import { DailySongsType } from '../../../services/recommendList'
import { getSearchResult } from '../../../services/search'
import SearchResultItem from './Item'

type SearchSuggestProps = {
  searchValue: string
}

const SearchResult: NextComponentType<{}, {}, SearchSuggestProps> = (props) => {
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<DailySongsType[]>([])
  const player = useAppSelector(selectPlayerMap)

  const awaitGetSearchResult = async () => {
    setIsSearchLoading(true)
    const res = await getSearchResult({ keywords: props.searchValue, limit: 20 })
    console.log(res)
    setSearchResult(res.data.result.songs)
    setIsSearchLoading(false)
  }

  useDebounceEffect(() => {
    console.log(props.searchValue)
    awaitGetSearchResult()
  }, [props.searchValue])

  return (
    <>
      {isSearchLoading ? (
        <div
          className={`${
            player.size === 0 ? 'h-[calc(100vh-4rem)]' : 'h-[calc(100vh-7rem)]'
          } flex flex-col justify-center items-center p-4`}>
          {/* loading */}
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div
          className={`${
            player.size === 0 ? 'h-[calc(100vh-4rem)]' : 'h-[calc(100vh-7rem)]'
          } flex flex-col p-4 overflow-y-scroll`}>
          {searchResult.map((item, index) => (
            <SearchResultItem key={item.id} data={item} className={index === 0 ? '' : 'mt-4'} />
          ))}
        </div>
      )}
    </>
  )
}

export default SearchResult
