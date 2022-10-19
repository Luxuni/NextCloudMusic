import { ReactElement } from 'react'
import MySwiper from '../../src/components/home/HomeSwiper'
import IconButtonSet from '../../src/components/home/IconButtonSet'
import MyHomeHead from '../../src/components/home/MyHomeHead'
import RecommendSong from '../../src/components/home/RecommendSong'
import XShow from '../../src/components/home/XShow'
import NavLayout from '../../src/components/layout/nav-layout'
import { getRecommendList, getRecommendSongs } from '../../src/services/recommendList'
import { NextPageWithLayout } from '../_app'

const HomePage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col">
      {/* search box */}
      <div className="sticky top-0 z-50 h-12 flex bg-gray-200">
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
      <div className="w-full mt-4">
        <div>
          <XShow title="推荐歌单" request={getRecommendList} isShowYFirst />
        </div>
        <div className="w-full mt-4">
          <RecommendSong title="每日推荐" request={getRecommendSongs} />
        </div>
      </div>
    </div>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

export default HomePage
