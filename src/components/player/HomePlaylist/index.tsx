import { NextComponentType } from 'next'
import { useAppSelector } from '../../../app/hooks'
import { selectPlayer } from '../../../features/player/playerSlice'
import Options from './Options'
import Playlist from './Playlist'

const HomePlaylist: NextComponentType = () => {
  const player = useAppSelector(selectPlayer)

  const playerLength = player.length

  return (
    <div className="w-full h-full p-4 flex flex-col">
      {/* title */}
      <div className="flex items-center">
        <h1 className="text-lg mr-4">当前播放</h1>
        <span className="text-gray-400">( {playerLength} )</span>
      </div>
      {/* option */}
      <Options />
      <div className="flex-1 overflow-y-scroll">
        <Playlist />
      </div>
    </div>
  )
}

export default HomePlaylist
