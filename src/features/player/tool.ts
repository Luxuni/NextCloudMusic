import { WritableDraft } from 'immer/dist/internal'
import { MutableRefObject } from 'react'
import { DailySongsType } from '../../services/recommendList'
import { PlayerState } from './playerSlice'

export const handlePlayModeMap = new Map([
  [
    'loop',
    (
      state: WritableDraft<PlayerState>,
      player: DailySongsType[],
      Audio: MutableRefObject<HTMLAudioElement | null> | undefined = undefined,
    ) => {
      if (state.playPointer === player.length - 1) {
        state.playPointer = 0
      } else {
        state.playPointer += 1
      }
      if (player.length === 1 && Audio) {
        Audio!.current?.load()
      }
    },
  ],
  [
    'random',
    (
      state: WritableDraft<PlayerState>,
      player: DailySongsType[],
      Audio: MutableRefObject<HTMLAudioElement | null> | undefined = undefined,
    ) => {
      const randomNum = Math.floor(Math.random() * player.length)
      if (randomNum === state.playPointer) {
        handlePlayModeMap.get('random')!(state, player, Audio)
      } else {
        state.playPointer = randomNum
      }
    },
  ],
  [
    'single',
    (
      _state: WritableDraft<PlayerState>,
      _player: DailySongsType[],
      Audio: MutableRefObject<HTMLAudioElement | null> | undefined = undefined,
    ) => {
      Audio!.current?.load()
    },
  ],
])

export const forcePlayThePreviousTrack = (
  state: WritableDraft<PlayerState>,
  player: DailySongsType[],
  Audio: MutableRefObject<HTMLAudioElement | null> | undefined = undefined,
) => {
  if (state.playPointer === 0) {
    state.playPointer = player.length - 1
  } else {
    state.playPointer -= 1
  }
  if (player.length === 1 && Audio) {
    Audio!.current?.load()
  }
}
