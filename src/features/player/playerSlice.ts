import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MutableRefObject } from 'react'
import { AppState } from '../../app/store'
import { DailySongsType } from '../../services/recommendList'
import { forcePlayThePreviousTrack, handlePlayModeMap } from './tool'

export interface PlayerState {
  value: Map<number, DailySongsType>
  playModeNumber: number
  playPointer: number
  status: 'idle' | 'loading' | 'failed'
  nowLyrics: Map<number, string>
  nowTime: number
  ShowLyrics: string
  ShowLyricsArr: string[]
}

const initialState: PlayerState = {
  value: new Map(),
  playPointer: 0,
  playModeNumber: 0,
  status: 'idle',
  nowLyrics: new Map(),
  nowTime: 0,
  ShowLyrics: '',
  ShowLyricsArr: [],
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,

  reducers: {
    addOneSongToPlayer: (state, action: PayloadAction<DailySongsType>) => {
      const value = Array.from(state.value.values())
      value.unshift(action.payload)
      state.value = new Map(value.map((item) => [item.id, item]))
    },

    jumpToSong: (state, action: PayloadAction<number>) => {
      const keys = Array.from(state.value.keys())
      state.playPointer = keys.indexOf(action.payload)
    },

    handleSongOnEnded: (state, action: PayloadAction<MutableRefObject<HTMLAudioElement | null> | undefined>) => {
      handlePlayModeMap.get(['loop', 'random', 'single'][state.playModeNumber])!(
        state,
        Array.from(state.value.values()),
        action.payload,
      )
    },

    handleForcePlayNextTrack: (state, action: PayloadAction<MutableRefObject<HTMLAudioElement | null> | undefined>) => {
      handlePlayModeMap.get('loop')!(state, Array.from(state.value.values()), action.payload)
    },

    handleForcePlayPreviousTrack: (
      state,
      action: PayloadAction<MutableRefObject<HTMLAudioElement | null> | undefined>,
    ) => {
      forcePlayThePreviousTrack(state, Array.from(state.value.values()), action.payload)
    },

    removeOneSongFromPlayer: (state, action: PayloadAction<DailySongsType>) => {
      if (state.playPointer === state.value.size - 1) {
        state.playPointer = 0
      }
      state.value.delete(action.payload.id)
    },

    playModeNumberAddition: (state, action: PayloadAction<number>) => {
      state.playModeNumber = action.payload
    },

    setLyrics: (state, action: PayloadAction<{ timeArr: number[]; lyricsArr: string[] }>) => {
      const { timeArr, lyricsArr } = action.payload
      const newMap = new Map()
      timeArr.forEach((item, index) => {
        newMap.set(Math.round(item), lyricsArr[index])
      })
      state.nowLyrics = newMap
    },

    setNowTime: (state, action: PayloadAction<number>) => {
      state.nowTime = action.payload
      if (state.nowLyrics.get(action.payload)) {
        state.ShowLyrics = state.nowLyrics.get(action.payload) || ''
      }
      // } else {
      //   // 获取上一条
      //   const keys = Array.from(state.nowLyrics.keys())
      //   const index = keys.indexOf(action.payload)
      //   if (index > 0) {
      //     state.ShowLyrics = state.nowLyrics.get(keys[index - 1]) || ''
      //   }
      // }
    },
  },
})

export const {
  addOneSongToPlayer,
  removeOneSongFromPlayer,
  playModeNumberAddition,
  jumpToSong,
  handleSongOnEnded,
  handleForcePlayNextTrack,
  handleForcePlayPreviousTrack,
  setLyrics,
  setNowTime,
} = playerSlice.actions

export const selectPlayer = (state: AppState) => Array.from(state.player.value.values())

export const selectPlayerMap = (state: AppState) => state.player.value

export const selectPlayModeNumber = (state: AppState) => state.player.playModeNumber

export const selectPlayMode = (state: AppState) => ['loop', 'random', 'single'][state.player.playModeNumber]

export const selectNeedPlayedSong = (state: AppState) =>
  Array.from(state.player.value.values())[state.player.playPointer]

export const selectNowLyrics = (state: AppState) => state.player.nowLyrics

export const selectNowLyricsValueArr = (state: AppState) => Array.from(state.player.nowLyrics.values())

export const selectShowLyrics = (state: AppState) => state.player.ShowLyrics

export default playerSlice.reducer
