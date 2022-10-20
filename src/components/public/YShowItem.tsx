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
      <div className="h-40 aspect-square ">
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
