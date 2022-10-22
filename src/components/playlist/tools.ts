import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { addOneSongToPlayer, jumpToSong } from '../../features/player/playerSlice'
import { DailySongsType } from '../../services/recommendList'
import { getSongUrl } from '../../services/song/url'

export const addOneSongAndJumpTo = async (
  data: DailySongsType,
  playlistMap: Map<number, DailySongsType>,
  dispatch: Dispatch<AnyAction>,
) => {
  if (!playlistMap.has(data.id) && !data.url) {
    const res = await getSongUrl({ id: data.id })
    data.url = res.data.data[0].url
    dispatch(addOneSongToPlayer(data))
  } else if (!playlistMap.has(data.id)) {
    dispatch(addOneSongToPlayer(data))
  } else if (playlistMap.has(data.id)) {
    dispatch(jumpToSong(data.id))
  }
  // add to playlist and jump to song
}
