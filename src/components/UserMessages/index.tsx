import { NextComponentType } from 'next'
import { getUserLoadingStatus } from '../../services/user'
import HomePopupHeader from './HomePopupHeader'
import Menu from './Menu'
import VipTag from './VipTag'

const menuCenterMap = new Map([
  [
    0,
    (children: JSX.Element) => (
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        消息中心
        <div className="flex-1 flex justify-end">{children}</div>
      </a>
    ),
  ],
  [
    1,
    (children) => (
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        云贝中心
        <div className="flex-1 flex justify-end">{children}</div>
      </a>
    ),
  ],
  [
    2,
    (children) => (
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
        创作者中心
        <div className="flex-1 flex justify-end">{children}</div>
      </a>
    ),
  ],
])

const UserMessages: NextComponentType = () => {
  const { data, isLoading, isError } = getUserLoadingStatus()
  if (isLoading) return <div>loading ...</div>
  return (
    <div className="flex flex-col">
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
    </div>
  )
}
export default UserMessages
