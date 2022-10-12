import {
  AaOutline,
  FaceRecognitionOutline,
  GiftOutline,
  GlobalOutline,
  HeartOutline,
  HistogramOutline,
  MovieOutline,
  PhonebookOutline,
  ShopbagOutline,
  TeamOutline,
} from 'antd-mobile-icons'
import { NextPageWithLayout } from '../../../../pages/_app'
import HomeIconButton from './HomeIconButton'

const HomeIconButtonMessageMap = new Map([
  [1, { icon: FaceRecognitionOutline, text: '每日推荐' }],
  [2, { icon: HeartOutline, text: '私人FM' }],
  [3, { icon: ShopbagOutline, text: '歌单' }],
  [4, { icon: HistogramOutline, text: '排行榜' }],
  [5, { icon: PhonebookOutline, text: '有声书' }],
  [6, { icon: AaOutline, text: '数字专辑' }],
  [7, { icon: MovieOutline, text: '直播' }],
  [8, { icon: TeamOutline, text: '关注新歌' }],
  [9, { icon: GlobalOutline, text: '歌房' }],
  [10, { icon: GiftOutline, text: '数字专辑' }],
])
const IconButtonSet: NextPageWithLayout = () => {
  return (
    <div className="flex overflow-x-scroll pl-4 pr-4">
      {Array.from(HomeIconButtonMessageMap).map((item) => {
        return <HomeIconButton key={item[0]} {...item[1]} />
      })}
    </div>
  )
}

export default IconButtonSet
