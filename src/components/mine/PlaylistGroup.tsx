import { Ellipsis } from 'antd-mobile'
import { NextComponentType } from 'next'
import Link from 'next/link'
import { playlistType } from '../../services/user'
import MyImage from '../public/MyImage'

type PlaylistGroupProps = {
  data: playlistType[] | undefined
  title: string
}

const PlaylistGroup: NextComponentType<{}, {}, PlaylistGroupProps> = (props) => {
  return (
    <div className="card w-full bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">
          {props.title}（{props.data?.length}）
        </h2>
        <div>
          {props.data?.map((item, index) => (
            <Link href={{ pathname: 'playlist', query: { id: item.id } }}>
              <div key={item.id} className={`flex items-center ${index === props.data!.length - 1 ? '' : 'mb-4'}`}>
                <MyImage src={item.coverImgUrl} height="4rem" width="4rem" borderRadius="1rem" />
                <div className="ml-4 w-2/3">
                  <Ellipsis className="text-lg text-black" content={item.name}></Ellipsis>
                  <div className="text-sm text-gray-400">{item.trackCount}首</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlaylistGroup
