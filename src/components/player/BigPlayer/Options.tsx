import { DotLoading, Toast } from 'antd-mobile'
import { NextComponentType } from 'next'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useAppSelector } from '../../../app/hooks'
import { selectNeedPlayedSong } from '../../../features/player/playerSlice'
import { getUserLikeListRequest, getUserLoadingStatus, likeSong } from '../../../services/user'
import { HOC } from '../HOC'

type OptionsProps = {
  userId?: number
}

const LoadingFC: React.FC = () => {
  return (
    <div className="h-full w-full flex text-white items-center justify-around">
      <DotLoading />
      <DotLoading />
      <DotLoading />
    </div>
  )
}

function PushIntoUserId(WrapComponent: NextComponentType<{}, {}, Required<OptionsProps>>) {
  return function PushIntoUserIdIndex() {
    const { data, isLoading, isError } = getUserLoadingStatus()
    if (isLoading) return <LoadingFC />

    return <WrapComponent userId={data.data.profile.userId} />
  }
}

const Options: NextComponentType<{}, {}, Required<OptionsProps>> = (props) => {
  const needPlayedSongMessage = useAppSelector(selectNeedPlayedSong)
  const [ids, setIds] = useImmer<Set<number>>(new Set())

  const getUserLikeList = async (userId: number) => {
    const { data } = await getUserLikeListRequest({ userId })
    setIds((draft) => {
      data.ids.forEach((id) => draft.add(id))
    })
  }

  const handleLikeSong = async () => {
    const addLikeres = await likeSong({ id: needPlayedSongMessage.id })
    if (addLikeres.data.code === 200) {
      Toast.show('已添加我喜欢')
    } else {
      Toast.show('添加失败')
    }
    getUserLikeList(props.userId)
  }

  useEffect(() => {
    getUserLikeList(props.userId)
  }, [props.userId])
  return (
    <div className="h-full w-full flex text-white items-center justify-around">
      {/* like ?? */}
      {ids.has(needPlayedSongMessage.id) ? (
        <div className="h-full w-1/6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      ) : (
        <div className="h-full w-1/6 flex items-center justify-center" onClick={handleLikeSong}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
      )}
      {/* download */}
      <div className="h-full w-1/6 flex items-center justify-center" onClick={() => {}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </div>
      {/* sing */}
      <div className="h-full w-1/6 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      </div>
      {/* comment */}
      <div className="h-full w-1/6 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      </div>
      {/* more */}
      <div className="h-full w-1/6 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
    </div>
  )
}

export default HOC<OptionsProps>((props) => props['userId'])(PushIntoUserId(Options))
