import { Ellipsis } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'

type PlaylistHeadProps = {
  isShowName: boolean
  name: string
}

const PlaylistHead: NextComponentType<{}, {}, PlaylistHeadProps> = (props) => {
  const router = useRouter()

  const handleBackToHome = () => {
    router.back()
  }
  return (
    <div className="h-full w-full flex">
      <div className="w-1/6 flex items-center justify-center" onClick={handleBackToHome}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        {/* {props.isShowName ? (
          <h1 className="text-center text-xl text-white font-bold animated bounceInDown backOutUp">
            {props.name}
          </h1>
        ) : (
          <h1 className="text-center text-xl text-white font-bold animated bounceInDown backOutUp">歌单</h1>
        )} */}
        {props.isShowName && (
          <h1 className="text-center text-xl text-white font-bold animated fadeInDown">
            <Ellipsis content={props.name} />
          </h1>
        )}
        {!props.isShowName && <h1 className="text-center text-xl text-white font-bold animated fadeInDown">歌单</h1>}
      </div>
      <div className="w-1/3 flex items-center justify-center">
        {/* search icon */}
        <div className="h-full w-1/2 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        {/* popup icon btn */}
        <div className="h-full w-1/2 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default PlaylistHead
