import { RightOutline } from 'antd-mobile-icons'
import { NextPageWithLayout } from '../../../pages/_app'

type ShowTabBarProps = {
  title: string
}
const ShowTabBar: NextPageWithLayout<ShowTabBarProps> = (props) => {
  return (
    <div className="h-8 flex items-center justify-between mb-4">
      {/* left */}
      <div className="flex items-center">
        <div className="text-xl">{props.title}</div>
        <RightOutline fontSize={18} />
      </div>
      {/* right ... */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-8">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
    </div>
  )
}

export default ShowTabBar
