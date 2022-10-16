import { NextComponentType } from 'next'
import { useAppSelector } from '../../../app/hooks'
import { selectPlayer } from '../../../features/player/playerSlice'
import Options from './Options'

const HomePlaylist: NextComponentType = () => {
  const player = useAppSelector(selectPlayer)

  const playerLength = player.length

  return (
    <div className="p-4">
      {/* title */}
      <div className="flex items-center">
        <h1 className="text-lg mr-4">当前播放</h1>
        <span className="text-gray-400">( {playerLength} )</span>
      </div>
      {/* option */}
      <Options />
    </div>
  )
}

export default HomePlaylist
