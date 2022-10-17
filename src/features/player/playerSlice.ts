import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../app/store'
import { DailySongsType } from '../../services/recommendList'

export interface PlayerState {
  value: DailySongsType[]
  playModeNumber: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PlayerState = {
  value: [],
  playModeNumber: 1,
  status: 'idle',
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addOneSongToPlayer: (state, action: PayloadAction<DailySongsType>) => {
      state.value.unshift(action.payload)
    },
    playModeNumberAddition: (state) => {
      state.playModeNumber += 1
    },
  },
})

export const { addOneSongToPlayer, playModeNumberAddition } = playerSlice.actions

export const selectPlayer = (state: AppState) => state.player.value

export const selectPlayModeNumber = (state: AppState) => state.player.playModeNumber

export default playerSlice.reducer
