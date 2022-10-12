import { Skeleton, Swiper } from 'antd-mobile'
import { NextPageWithLayout } from '../../../pages/_app'
import { getBanner } from '../../services/banner'
import MyImage from '../public/MyImage'

const MySwiper: NextPageWithLayout = () => {
  const { data, isLoading, isError } = getBanner({ type: 2 })
  if (isLoading) return <Skeleton animated style={{ width: '100%', height: '100%', borderRadius: '1rem' }} />

  const items = data.banners.map((bannerItem) => (
    <Swiper.Item key={bannerItem.bannerId}>
      <MyImage src={bannerItem.pic} height="15rem" />
    </Swiper.Item>
  ))

  return (
    <Swiper
      loop
      autoplay
      style={{
        '--border-radius': '1rem',
      }}>
      {items}
    </Swiper>
  )
}

export default MySwiper
