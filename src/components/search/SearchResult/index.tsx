import { useDebounceEffect } from 'ahooks'
import { NextComponentType } from 'next'
import { useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectPlayerMap } from '../../../features/player/playerSlice'
import { getSearchSuggest } from '../../../services/search'
import SearchResultItem from './Item'

type SearchResultProps = {
  searchValue: string
}

const SearchResult: NextComponentType<{}, {}, SearchResultProps> = (props) => {
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<{ keyword: string }[]>([])

  const awaitGetSearchResult = async () => {
    setIsSearchLoading(true)
    const res = await getSearchSuggest({ keywords: props.searchValue, type: 'mobile' })
    setSearchResult(res.data.result.allMatch)
    setIsSearchLoading(false)
  }

  useDebounceEffect(() => {
    awaitGetSearchResult()
  }, [props.searchValue])

  const player = useAppSelector(selectPlayerMap)
  return (
    <>
      {isSearchLoading ? (
        <div
          className={`${
            player.size === 0 ? 'h-[calc(100vh-3rem)]' : 'h-[calc(100vh-3rem)]'
          } flex flex-col justify-center items-center p-4`}>
          {/* loading */}
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div className={`${player.size === 0 ? '' : 'h-[calc(100vh-7rem)]'} flex flex-col p-4`}>
          {searchResult.map((item, index) => (
            <SearchResultItem key={item.keyword} data={item} className={index === 0 ? '' : 'mt-4'} />
          ))}
        </div>
      )}
    </>
  )
}

export default SearchResult
