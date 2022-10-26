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
}

const initialState: PlayerState = {
  value: new Map(),
  playPointer: 0,
  playModeNumber: 0,
  status: 'idle',
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
} = playerSlice.actions

export const selectPlayer = (state: AppState) => Array.from(state.player.value.values())

export const selectPlayerMap = (state: AppState) => state.player.value

export const selectPlayModeNumber = (state: AppState) => state.player.playModeNumber

export const selectPlayMode = (state: AppState) => ['loop', 'random', 'single'][state.player.playModeNumber]

export const selectNeedPlayedSong = (state: AppState) =>
  Array.from(state.player.value.values())[state.player.playPointer]

export default playerSlice.reducer
