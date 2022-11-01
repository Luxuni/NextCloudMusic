import { useDebounceEffect, useLockFn } from 'ahooks'
import { List } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectPlayerMap } from '../../../features/player/playerSlice'
import { DailySongsType } from '../../../services/recommendList'
import { getSearchResult } from '../../../services/search'
import ListItem from '../../playlist/ListItem'
import { addOneSongAndJumpTo } from '../../playlist/tools'

type SearchSuggestProps = {
  searchValue: string
}

const SearchResult: NextComponentType<{}, {}, SearchSuggestProps> = (props) => {
  const dispatch = useAppDispatch()
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<DailySongsType[]>([])
  const playlistMap = useAppSelector(selectPlayerMap)

  const awaitGetSearchResult = async () => {
    setIsSearchLoading(true)
    const res = await getSearchResult({ keywords: props.searchValue, limit: 20 })
    setSearchResult(res.data.result.songs)
    setIsSearchLoading(false)
  }

  const handleClickSearchResultItem = useLockFn(async (item: DailySongsType) => {
    addOneSongAndJumpTo(item, playlistMap, dispatch)
  })

  useDebounceEffect(() => {
    awaitGetSearchResult()
  }, [props.searchValue])
  return (
    <>
      {isSearchLoading ? (
        <div
          className={`${
            playlistMap.size === 0 ? 'h-[calc(100vh-4rem)]' : 'h-[calc(100vh-7rem)]'
          } flex flex-col justify-center items-center p-4`}>
          {/* loading */}
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div
          className={`${
            playlistMap.size === 0 ? 'h-[calc(100vh-4rem)]' : 'h-[calc(100vh-7rem)]'
          } flex flex-col p-4 overflow-y-scroll`}>
          <List>
            {searchResult.map((item, index) => (
              <List.Item key={item.id} onClick={handleClickSearchResultItem.bind(this, item)} arrow={false}>
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
