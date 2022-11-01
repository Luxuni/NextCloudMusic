import { NextComponentType } from 'next'
import { getLoginStatusType, getUserDetail } from '../../services/user'
import MyImage from '../public/MyImage'

type MineHeadProps = {
  data: getLoginStatusType
}

const MineHead: NextComponentType<{}, {}, MineHeadProps> = (props) => {
  const { data, isLoading, isError } = getUserDetail({ uid: props.data.data.profile.userId })
  if (isLoading) return <div>loading...</div>

  return (
    <div className="card w-full bg-gradient-to-t from-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title h-16 w-16">
          <MyImage src={props.data.data.profile.avatarUrl} borderRadius="4rem" />
        </h2>
        <p className="text-lg font-bold">{props.data.data.profile.nickname}</p>
        <div className="card-actions justify-end">
          <div>{data.profile.follows}关注</div>
          <div>{data.profile.followeds}粉丝</div>
          <div>Lv.{data.level}</div>
        </div>
      </div>
    </div>
  )
}

export default MineHead
