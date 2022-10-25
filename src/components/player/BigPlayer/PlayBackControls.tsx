import { Slider, Toast } from 'antd-mobile'
import { NextComponentType } from 'next'
import PlaylistBtn from '../PlaylistBtn'
import PlayMode from '../PlayMode'

const PlaybackControls: NextComponentType = () => {
  const toastValue = (value: number | number[]) => {
    let text = ''
    if (typeof value === 'number') {
      text = `${value}`
    } else {
      text = `[${value.join(',')}]`
    }
    Toast.show(`当前选中值为：${text}`)
    console.log(value)
  }
  return (
    <div className="flex flex-col h-full">
      {/* range */}
      <div className="flex items-center pl-2 pr-2">
        <div>00:00</div>
        <div className="w-5/6">
          <Slider
            className=""
            style={{
              '--fill-color': '#DBC8AC',
            }}
            icon={<></>}
            defaultValue={40}
            onAfterChange={toastValue}
          />
        </div>
        <div>00:00</div>
      </div>
      {/* bottom */}
      <div className="flex-1 flex items-center justify-between">
        {/* left --> play mode */}
        <div className="h-full w-1/5">
          <PlayMode isShowTitle={false} className="text-white" heightName="h-8" widthName="w-8" />
        </div>
        {/* middle --> previous , next and play or pause */}
        <div className='h-full w-3/5 flex'>

        </div>
        {/* right --> playlist */}
        <div className="h-full w-1/5">
          <PlaylistBtn className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  )
}

export default PlaybackControls
