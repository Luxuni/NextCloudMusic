import { Ellipsis } from 'antd-mobile'
import { NextComponentType } from 'next'
import { DailySongsType } from '../../services/recommendList'

type ListItemProps = {
  index: number
  track: DailySongsType
}

const ListItem: NextComponentType<{}, {}, ListItemProps> = (props) => {
  return (
    <div className="flex justify-between items-center w-full">
      {/* left */}
      <div className="flex items-center w-3/4">
        {/* index */}
        <div className="w-10 mr-4 text-gray-400">{props.index}</div>
        {/* content */}
        <div>
          <Ellipsis className="text-base" content={props.track.name} />
          <Ellipsis
            className="text-xs mt-2"
            content={(props.track.artists || props.track.ar).map((item) => item.name).join(' ')}
          />
        </div>
      </div>
      {/* rigth */}
      <div className="w-1/4 flex justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
    </div>
  )
}

export default ListItem
