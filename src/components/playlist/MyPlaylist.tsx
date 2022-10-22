import { List } from 'antd-mobile'
import { NextComponentType } from 'next'
import ListItem from './ListItem'
type MyPlaylistProps = {
  tracks: {
    name: string
    id: number
    mv: number
    ar: {
      name: string
      id: number
    }[]
  }[]
}
const MyPlaylist: NextComponentType<{}, {}, MyPlaylistProps> = (props) => {
  return (
    <>
      <List>
        {props.tracks.map((item, index) => (
          <List.Item key={item.id}>
            <ListItem index={index + 1} track={item} />
          </List.Item>
        ))}
      </List>
      {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
    </>
  )
}

export default MyPlaylist
