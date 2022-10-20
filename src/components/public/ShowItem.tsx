import { Ellipsis } from 'antd-mobile'
import { NextPageWithLayout } from '../../../pages/_app'
import MyImage from './MyImage'
import Link from 'next/link'

type ShowItemType = {
  image: string
  name: string
  data?: {
    id: number
    name: string
    picUrl: string
    playCount: number
    trackCount: number
    trackNumberUpdateTime: number
  }
}

const ShowItem: NextPageWithLayout<ShowItemType> = (props) => {
  return (
    <>
      <Link href={{ pathname: 'playlist', query: { id: props.data!.id } }}>
        <div className="h-40 aspect-square shadow-xl shadow-slate-300 relative">
          {props.data && (
            <>
              {/* play count */}
              <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs rounded-bl-md rounded-tr-md px-2 py-1">
                <span className="mr-2">
                  {props.data.playCount > 10000
                    ? `${Math.floor(props.data.playCount / 10000)}万`
                    : props.data.playCount}
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
            </>
          )}
          <MyImage src={props.image} borderRadius={8} />
        </div>
      </Link>
      <Ellipsis className="w-40 mt-4" direction="end" content={props.name} />
    </>
  )
}

export default ShowItem
