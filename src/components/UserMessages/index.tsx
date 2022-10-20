import { NextComponentType } from 'next'
import { getUserLoadingStatus } from '../../services/user'
import HomePopupHeader from './HomePopupHeader'
import VipTag from './VipTag'

const UserMessages: NextComponentType = () => {
  const { data, isLoading, isError } = getUserLoadingStatus()
  if (isLoading) return <div>loading ...</div>
  return (
    <div className="flex flex-col">
      {/* top-->username and scan code icon */}
      <HomePopupHeader avatarUrl={data.data.profile.avatarUrl} nickname={data.data.profile.nickname} />
      <div className="mt-4">
        <VipTag />
      </div>
    </div>
  )
}
export default UserMessages
