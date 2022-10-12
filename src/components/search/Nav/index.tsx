import { UserOutline, FlagOutline, BellOutline, AudioOutline } from 'antd-mobile-icons'
import { NextPageWithLayout } from '../../../../pages/_app'
import NavItem from './NavItem'

const navMessages = new Map([
  [1, { icon: UserOutline, text: '歌手' }],
  [2, { icon: FlagOutline, text: '曲风' }],
  [3, { icon: BellOutline, text: '专区' }],
  [4, { icon: AudioOutline, text: '识曲' }],
])

const SearchNav: NextPageWithLayout = () => {
  return (
    <div className="flex">
      {Array.from(navMessages).map((item, index) => {
        return (
          <div key={item[0]} className={index === 0 ? 'w-1/4' : 'w-1/4 border-l-2'}>
            <NavItem key={item[0]} {...item[1]} />
          </div>
        )
      })}
    </div>
  )
}

export default SearchNav
