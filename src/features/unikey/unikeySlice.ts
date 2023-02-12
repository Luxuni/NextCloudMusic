import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../app/store'

export interface unikeyState {
  unikey: string
}

const initialState: unikeyState = {
  unikey: '',
}

export const unikeySlice = createSlice({
  name: 'unikey',
  initialState,

  reducers: {
    changeUnikey: (state, action: PayloadAction<string>) => {
      state.unikey = action.payload
    },
  },
})

export const { changeUnikey } = unikeySlice.actions

export const selectUnikey = (state: AppState) => state.unikey.unikey

export default unikeySlice.reducer
