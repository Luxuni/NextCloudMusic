import { NextPageWithLayout } from '../../../../pages/_app'
import { PlayOutline } from 'antd-mobile-icons'
type SearchListTabBarProps = {
  title: string
  hasRightBtn: boolean
}

const SearchListTabBar: NextPageWithLayout<SearchListTabBarProps> = (props) => {
  return (
    <div className="h-12 flex justify-between items-center">
      {/* left */}
      <h1 className="text-base">{props.title}</h1>
      {/* right */}
      <div>
        {props.hasRightBtn ? (
          <div className="h-6 w-16 flex justify-around items-center pr-2 pl-2 rounded-full bg-gray-200">
            <PlayOutline />
            <span>播放</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SearchListTabBar
