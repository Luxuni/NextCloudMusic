import { useCreation, useLockFn } from 'ahooks'
import { Ellipsis, Skeleton } from 'antd-mobile'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { createRef, useEffect, useLayoutEffect, useState } from 'react'
import NavLayout from '../../src/components/layout/nav-layout'
import BigCover from '../../src/components/playlist/BigCover'
import MyPlaylist from '../../src/components/playlist/MyPlaylist'
import PlayAll from '../../src/components/playlist/PlayAll'
import PlaylistHead from '../../src/components/playlist/PlaylistHead'
import PlaylistMessage from '../../src/components/playlist/PlaylistMessage'
import { getPlaylistDetailRequest, PlaylistDetailType } from '../../src/services/playlist'
import { NextPageWithLayout } from '../_app'

const ShowPlaylistPage: NextPageWithLayout = () => {
  const router = useRouter()
  const messageRef = createRef<HTMLDivElement>()
  const [isShowName, setIsShowName] = useState(false)
  const [isShowBigCover, setIsShowBigCover] = useState(false)
  const [data, setData] = useState<PlaylistDetailType | null>(null)
  let observer = useCreation<IntersectionObserver | null>(() => null, [])

  const GetPlaylistDetailRequest = useLockFn(async () => {
    const res = await getPlaylistDetailRequest({ id: router.query.id as string })
    setData(res.data)
  })

  useLayoutEffect(() => {
    observer = new IntersectionObserver((entries) => {
      _.debounce(
        () => {
          if (entries[0].intersectionRatio) {
            setIsShowName(false)
          } else {
            setIsShowName(true)
          }
        },
        1000,
        { leading: true, trailing: false },
      )()
    })

    if (messageRef.current) {
      observer?.observe(messageRef.current)
    }
    return () => {
      observer?.disconnect()
    }
  }, [messageRef])

  useEffect(() => {
    if (router.query.id) {
      GetPlaylistDetailRequest()
    }
  }, [router.query])

  if (data === null)
    return (
      <div>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={30} animated />
      </div>
    )

  const handleClickCover = () => {
    setIsShowBigCover(!isShowBigCover)
  }
  return (
    <>
      {isShowBigCover ? (
        <BigCover data={data} setIsShowBigCover={setIsShowBigCover} className="animated fadeIn" />
      ) : (
        <div style={{ backgroundImage: `url(${data.playlist.coverImgUrl})` }} className="bg-cover">
          {/* playlist head */}
          <div className="sticky top-0 h-12 z-50 bg-black">
            <PlaylistHead isShowName={isShowName} name={data.playlist.name} />
          </div>
          <div ref={messageRef} className="backdrop-blur-xl backdrop-brightness-50">
            {/* cover , message , options */}
            <div className="h-[17rem] p-4 w-full">
              <PlaylistMessage
                coverImgUrl={data.playlist.coverImgUrl}
                playCount={data.playlist.playCount}
                name={data.playlist.name}
                avatarUrl={data.playlist.creator.avatarUrl}
                nickname={data.playlist.creator.nickname}
                onClick={handleClickCover}
              />
              {/* description */}
              <div className="mt-4 text-white">
                <Ellipsis content={data.playlist.description ?? ''} />
              </div>
              {/* options */}
              <div className="flex justify-around mt-4">
                <button className="btn btn-active btn-ghost text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 mr-4">
                    <path
                      fillRule="evenodd"
                      d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {data.playlist.shareCount}
                </button>
                <button className="btn btn-active btn-ghost text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  {data.playlist.commentCount}
                </button>
                <button className="btn btn-active btn-secondary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                  {data.playlist.subscribedCount}
                </button>
              </div>
            </div>
          </div>
          {/* playlist content */}
          <div className="p-4 sticky top-12 z-50 bg-white">
            <PlayAll trackCount={data.playlist.trackCount} />
          </div>
          <div>
            <MyPlaylist tracks={data.playlist.tracks} />
          </div>
        </div>
      )}
    </>
  )
}

ShowPlaylistPage.getLayout = (page) => {
  return <NavLayout>{page}</NavLayout>
}

export default ShowPlaylistPage
