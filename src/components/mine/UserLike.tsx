import { NextComponentType } from 'next'
import Link from 'next/link'
import { getUserPlaylistType } from '../../services/user'
import MyImage from '../public/MyImage'

type UserLikeProps = {
  userPlaylist: getUserPlaylistType
}
const UserLike: NextComponentType<{}, {}, UserLikeProps> = (props) => {
  return (
    <div className="card w-full glass">
      <figure className="w-full aspect-square">
        <MyImage src={props.userPlaylist.playlist[0].coverImgUrl} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">我喜欢的音乐</h2>
        <div className="card-actions justify-end">
          <Link href={{ pathname: 'playlist', query: { id: props.userPlaylist.playlist[0].id } }}>
            <button className="btn btn-primary">进去看看！</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserLike
