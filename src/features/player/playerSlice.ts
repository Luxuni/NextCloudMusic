import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../app/store'
import { DailySongsType } from '../../services/recommendList'

export interface PlayerState {
  value: Map<number, DailySongsType>
  playModeNumber: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PlayerState = {
  value: new Map(),
  playModeNumber: 1,
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
    removeOneSongFromPlayer: (state, action: PayloadAction<DailySongsType>) => {
      state.value.delete(action.payload.id)
    },
    playModeNumberAddition: (state) => {
      state.playModeNumber += 1
    },
  },
})

export const { addOneSongToPlayer, removeOneSongFromPlayer, playModeNumberAddition } = playerSlice.actions

export const selectPlayer = (state: AppState) => Array.from(state.player.value.values())

export const selectPlayerMap = (state: AppState) => state.player.value

export const selectPlayModeNumber = (state: AppState) => state.player.playModeNumber

export default playerSlice.reducer
