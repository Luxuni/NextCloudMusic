import { List } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectPlayerMap } from '../../features/player/playerSlice'
import { DailySongsType } from '../../services/recommendList'
import ListItem from './ListItem'
import { addOneSongAndJumpTo } from './tools'

type MyPlaylistProps = {
  tracks: DailySongsType[]
}

const MyPlaylist: NextComponentType<{}, {}, MyPlaylistProps> = (props) => {
  const dispatch = useAppDispatch()
  const playlistMap = useAppSelector(selectPlayerMap)

  const handleListItemClicked = async(item: DailySongsType) => {
    addOneSongAndJumpTo(item, playlistMap, dispatch)
  }
  return (
    <>
      <List>
        {props.tracks.map((item, index) => (
          <List.Item key={item.id} onClick={handleListItemClicked.bind(this, item)} arrow={false}>
            <ListItem index={index + 1} track={item} />
          </List.Item>
        ))}
      </List>
      {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
    </>
  )
}

export default MyPlaylist
