import { NextComponentType } from 'next'
import { getUserLoadingStatus } from '../../services/user'
import HomePopupHeader from './HomePopupHeader'
import Menu from './Menu'
import { menuCenterMap, musicServerMap, otherMap } from './MenuMap'
import VipTag from './VipTag'

const UserMessages: NextComponentType = () => {
  const { data, isLoading, isError } = getUserLoadingStatus()
  if (isLoading) return <div>loading ...</div>
  return (
    <div className="flex flex-col ">
      {/* top-->username and scan code icon */}
      <HomePopupHeader avatarUrl={data.data.profile.avatarUrl} nickname={data.data.profile.nickname} />
      {/* VIP */}
      <div className="mt-4">
        <VipTag />
      </div>
      {/* center */}
      <div className="mt-4">
        <Menu contentMap={menuCenterMap} />
      </div>
      {/* music server */}
      <div className="mt-4">
        <Menu contentMap={musicServerMap} title="音乐服务" />
      </div>
      {/* other */}
      <div className="mt-4 shrink-0">
        <Menu contentMap={otherMap} title="其他" />
      </div>
    </div>
  )
}

export default UserMessages
