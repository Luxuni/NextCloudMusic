import { useDebounceEffect } from 'ahooks'
import { NextComponentType } from 'next'
import { useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectPlayerMap } from '../../../features/player/playerSlice'
import { getSearchSuggest } from '../../../services/search'
import SearchSuggestItem from './Item'

type SearchSuggestProps = {
  searchValue: string
  onClick: (keyword: string) => void
}

const SearchSuggest: NextComponentType<{}, {}, SearchSuggestProps> = (props) => {
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [searchSuggest, setSearchSuggest] = useState<{ keyword: string }[]>([])

  const awaitGetSearchSuggest = async () => {
    setIsSearchLoading(true)
    const res = await getSearchSuggest({ keywords: props.searchValue, type: 'mobile' })
    setSearchSuggest(res.data.result.allMatch)
    setIsSearchLoading(false)
  }

  useDebounceEffect(() => {
    awaitGetSearchSuggest()
  }, [props.searchValue])

  const player = useAppSelector(selectPlayerMap)
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
        <div className={`${player.size === 0 ? 'h-[calc(100vh-4rem)]' : 'h-[calc(100vh-7rem)]'} flex flex-col p-4`}>
          {searchSuggest.map((item, index) => (
            <SearchSuggestItem
              key={item.keyword}
              data={item}
              onClick={props.onClick}
              className={index === 0 ? '' : 'mt-4'}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default SearchSuggest
