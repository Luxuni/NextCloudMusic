import { useDebounceEffect } from 'ahooks'
import { List } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectPlayerMap } from '../../../features/player/playerSlice'
import { DailySongsType } from '../../../services/recommendList'
import { getSearchResult } from '../../../services/search'
import ListItem from '../../playlist/ListItem'

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
          <List>
            {searchResult.map((item, index) => (
              <List.Item key={item.id} arrow={false}>
                <ListItem index={index + 1} track={item} />
              </List.Item>
            ))}
          </List>
        </div>
      )}
    </>
  )
}

export default SearchResult
