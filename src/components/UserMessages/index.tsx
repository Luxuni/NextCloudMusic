import { Skeleton } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { loginOut } from '../../services/login'
import { getUserLoadingStatus } from '../../services/user'
import HomePopupHeader from './HomePopupHeader'
import Menu from './Menu'
import { menuCenterMap, musicServerMap, otherMap } from './MenuMap'
import VipTag from './VipTag'

const UserMessages: NextComponentType = () => {
  const { data, isLoading, isError } = getUserLoadingStatus()

  const router = useRouter()

  const handleLoginOut = async () => {
    await loginOut()
    router.push('/login')
  }

  if (isLoading)
    return (
      <>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={30} animated />
      </>
    )
  return (
    <div className="flex flex-col ">
      {/* top-->username and scan code icon */}
      <HomePopupHeader avatarUrl={data.data.profile.avatarUrl} nickname={data.data.profile.nickname} />
      {/* VIP */}
      <div className="mt-8">
        <VipTag />
      </div>
      {/* center */}
      <div className="mt-8">
        <Menu contentMap={menuCenterMap} />
      </div>
      {/* music server */}
      <div className="mt-8">
        <Menu contentMap={musicServerMap} title="音乐服务" />
      </div>
      {/* other */}
      <div className="mt-8 shrink-0">
        <Menu contentMap={otherMap} title="其他" />
      </div>
      {/* login out */}
      <div className="mt-8">
        <button className="btn btn-active btn-secondary w-full shadow-xl" onClick={handleLoginOut}>
          退出登陆
        </button>
      </div>
    </div>
  )
}

export default UserMessages
