import { useAsyncEffect } from 'ahooks'
import { NextComponentType } from 'next'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  selectNeedPlayedSong,
  selectNowLyricsValueArr,
  selectShowLyrics,
  setLyrics,
} from '../../../features/player/playerSlice'
import { getLyric } from '../../../services/song/url'

const Lyrice: NextComponentType<{}, {}, {}> = () => {
  const nowPlayingSong = useAppSelector(selectNeedPlayedSong)

  const showLyrics = useAppSelector(selectShowLyrics)
  console.log(showLyrics)

  const showLyricsArr = useAppSelector(selectNowLyricsValueArr)

  const dispatch = useAppDispatch()

  const getTime = (item: string) => {
    const time = item.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/)
    if (time) {
      const min = parseInt(time[1])
      const sec = parseInt(time[2])
      const ms = parseInt(time[3])
      return min * 60 + sec + ms / 1000
    }
    return 0
  }

  const getLyr = (item: string) => {
    const lyric = item.replace(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/g, '')
    return lyric
  }

  useAsyncEffect(async () => {
    console.log('nowPlayingSong', nowPlayingSong)
    const res = await getLyric({ id: nowPlayingSong.id })
    const arr = res.data.lrc.lyric.split('\n')
    const timeArr = arr.map((item) => {
      return getTime(item)
    })
    const lyricsArr = arr.map((item) => {
      return getLyr(item)
    })
    // 放入map
    dispatch(setLyrics({ timeArr, lyricsArr }))
  }, [nowPlayingSong])

  return (
    <div className="h-full w-full overflow-y-scroll">
      {showLyricsArr.map((item, index) => {
        if (item === showLyrics) {
          return (
            <div key={index} className="text-center text-xl font-black">
              {item}
            </div>
          )
        } else {
        return (
          <div key={index} className="text-center opacity-50">
            {item}
          </div>
        )
        }
      })}
    </div>
  )
}

export default Lyrice
