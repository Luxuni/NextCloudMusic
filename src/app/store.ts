import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import playerReducer from '../features/player/playerSlice'

export function makeStore() {
  return configureStore({
    reducer: {player: playerReducer },
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
    ],
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store
