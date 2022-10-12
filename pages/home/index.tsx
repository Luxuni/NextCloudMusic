import IconButtonSet from '../../src/components/home/IconButtonSet'
import MyHomeHead from '../../src/components/home/MyHomeHead'
import MySwiper from '../../src/components/home/MySwiper'
import XShow from '../../src/components/home/XShow'
import { NextPageWithLayout } from '../_app'
import { getRecommendList } from '../../src/services/recommendList'

const HomePage: NextPageWithLayout = () => {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* search box */}
      <div className="h-12 flex">
        <MyHomeHead />
      </div>
      {/* swiper */}
      <div className="h-60 mt-4 pl-4 pr-4">
        <MySwiper />
      </div>
      {/* icon button set */}
      <div className="mt-4 w-full">
        <IconButtonSet />
      </div>
      {/* Recommended playlist */}
      <div className="h-64 w-full mt-4">
        <XShow title="推荐歌单" request={getRecommendList} />
      </div>
    </div>
  )
}
export default HomePage
