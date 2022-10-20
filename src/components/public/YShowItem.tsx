import { Ellipsis, Skeleton, Swiper } from 'antd-mobile'
import { useState } from 'react'
import { NextPageWithLayout } from '../../../pages/_app'
import { customizeRequestType } from '../../services'
import { RecommendDailyListType } from '../../services/recommendList'
import MyImage from './MyImage'

type YShowItemType = {
  request: customizeRequestType<any, RecommendDailyListType>
}

const YShowItem: NextPageWithLayout<YShowItemType> = (props) => {
  const { data, isLoading, isError } = props.request({ limit: 5 })

  const [name, setName] = useState<string | null>(null)

  if (isLoading) {
    return <Skeleton animated style={{ height: '10rem', width: '10rem', borderRadius: '1rem', paddingRight: '1rem' }} />
  } else {
    if (name === null) {
      setName(data.recommend[0].name)
    }
  }

  const verticalItems = data.recommend.map((recommendItem, index) => (
    <Swiper.Item key={recommendItem.id}>
      <div className="h-40 aspect-square relative">
        {/* play count */}
        <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs rounded-bl-md rounded-tr-md px-2 py-1">
          <span className="mr-2">
            {recommendItem.playcount > 10000
              ? `${Math.floor(recommendItem.playcount / 10000)}万`
              : recommendItem.playcount}
          </span>
        </div>
        {/* play btn */}
        <div className="absolute bottom-4 right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-gray-500">
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <MyImage src={recommendItem.picUrl} borderRadius={8} />
      </div>
    </Swiper.Item>
  ))

  const swiperChange = (index: number) => {
    setName(data.recommend[index].name)
  }

  return (
    <div className="h-full">
      <Swiper
        className="shadow-xl shadow-slate-400"
        loop
        autoplay
        direction="vertical"
        onIndexChange={swiperChange}
        style={{ '--height': '10rem', '--width': '10rem', '--border-radius': '1rem' }}>
        {verticalItems}
      </Swiper>
      {name && <Ellipsis className="w-40 mt-4" direction="end" content={name} />}
    </div>
  )
}

export default YShowItem
