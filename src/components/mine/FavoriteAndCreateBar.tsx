import { NextComponentType } from 'next'
import { useState } from 'react'

type FavoriteAndCreateBarProps = {
  favorite: React.MutableRefObject<HTMLDivElement | null>
  create: React.MutableRefObject<HTMLDivElement | null>
}

const FavoriteAndCreateBar: NextComponentType<{}, {}, FavoriteAndCreateBarProps> = (props) => {
  const [active, setActive] = useState(0)
  return (
    <div className="sticky top-12 z-10 bg-white tabs flex items-center justify-around border-white">
      <a
        className={`tab tab-lg tab-bordered ${active === 0 ? 'tab-active' : ''}`}
        onClick={() => {
          setActive(0)
          props.favorite.current?.scrollIntoView({ behavior: 'smooth' })
        }}>
        创建歌单
      </a>
      <a
        className={`tab tab-lg tab-bordered ${active === 1 ? 'tab-active' : ''}`}
        onClick={() => {
          setActive(1)
          props.create.current?.scrollIntoView({ behavior: 'smooth' })
        }}>
        收藏歌单
      </a>
    </div>
  )
}

export default FavoriteAndCreateBar
