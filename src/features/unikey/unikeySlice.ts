import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../app/store'
import { getQRKey } from '../../services/login'

export interface unikeyState {
  unikey: string
}

const initialState: unikeyState = {
  unikey: '',
}

export const getUnikeyAsync = createAsyncThunk(
  'unikey/fetchUnikey',
  async ({ cancel, callRun }: { cancel?: () => void; callRun?: () => void }) => {
    cancel && cancel()
    const response = await getQRKey()
    callRun && callRun()
    return response.data.data.unikey
  },
)

export const unikeySlice = createSlice({
  name: 'unikey',
  initialState,

  reducers: {
    changeUnikey: (state, action: PayloadAction<string>) => {
      state.unikey = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUnikeyAsync.fulfilled, (state, action) => {
      state.unikey = action.payload
    })
  },
})

export const { changeUnikey } = unikeySlice.actions

export const selectUnikey = (state: AppState) => state.unikey.unikey

export default unikeySlice.reducer
