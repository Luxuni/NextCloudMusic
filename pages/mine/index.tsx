import { useCreation, useLockFn } from 'ahooks'
import React, { useEffect, useRef, useState } from 'react'
import MyHomeHead from '../../src/components/home/MyHomeHead'
import NavLayout from '../../src/components/layout/nav-layout'
import FavoriteAndCreateBar from '../../src/components/mine/FavoriteAndCreateBar'
import MineHead from '../../src/components/mine/MineHead'
import MinePageOptions from '../../src/components/mine/MinePageOptions'
import PlaylistGroup from '../../src/components/mine/PlaylistGroup'
import UserLike from '../../src/components/mine/UserLike'
import {
  getUserLoadingStatus,
  getUserPlaylist,
  getUserPlaylistType,
  getUserSubCountType,
  UserSubCountRequest,
} from '../../src/services/user'
import { NextPageWithLayout } from '../_app'

const Mine: NextPageWithLayout = () => {
  const { data, isLoading, isError } = getUserLoadingStatus()
  const [userSubCount, setUserSubCount] = useState<getUserSubCountType | null>(null)
  const [userPlaylist, setUserPlaylist] = useState<getUserPlaylistType | null>(null)
  const favorite = useRef<HTMLDivElement | null>(null)
  const create = useRef<HTMLDivElement | null>(null)

  const loading = useCreation(
    () => isLoading || !userSubCount || !userPlaylist,
    [isLoading, userSubCount, userPlaylist],
  )

  const getUserSubCountRequest = useLockFn(async () => {
    const res = await UserSubCountRequest()
    console.log(res.data)

    setUserSubCount(res.data)
  })

  const getUserPlaylistRequest = useLockFn(async () => {
    const res = await getUserPlaylist({ uid: data.data.profile.userId })
    setUserPlaylist(res.data)
  })

  useEffect(() => {
    if (isLoading === false) {
      getUserSubCountRequest()
      getUserPlaylistRequest()
    }
  }, [isLoading])

  if (loading) return <div>loading...</div>

  return (
    <div>
      <div className="sticky top-0 z-50 h-12 flex bg-gray-200 shadow-xl">
        <MyHomeHead />
      </div>
      {/* Mine head */}
      <div className="h-44 pr-4 pl-4 mb-8 mt-4">
        <MineHead data={data} />
      </div>
      <div className="h-44 pr-4 pl-4 mt-4">
        <MinePageOptions />
      </div>
      <div className="pr-4 pl-4 mt-4 mb-8">
        <UserLike userPlaylist={userPlaylist!} />
      </div>
      {/* favorite and create */}
      <FavoriteAndCreateBar favorite={favorite} create={create} />
      <div ref={favorite} className="pr-4 pl-4 mt-4">
        <PlaylistGroup data={userPlaylist?.playlist.filter((item) => !item.subscribed).slice(1)} title="创建歌单" />
      </div>
      <div ref={create} className="pr-4 pl-4 mt-4">
        <PlaylistGroup data={userPlaylist?.playlist.filter((item) => item.subscribed)} title="收藏歌单" />
      </div>
    </div>
  )
}

Mine.getLayout = function getLayout(page: React.ReactNode) {
  return <NavLayout>{page}</NavLayout>
}

export default Mine
