import { Ellipsis } from 'antd-mobile'
import { NextPageWithLayout } from '../../../pages/_app'
import MyImage from './MyImage'

type ShowItemType = {
  image: string
  name: string
}

const ShowItem: NextPageWithLayout<ShowItemType> = (props) => {
  return (
    <>
      <div className="h-40 aspect-square shadow-xl shadow-slate-300">
        <MyImage src={props.image} borderRadius={8} />
      </div>
      <Ellipsis className="w-40 mt-4" direction="end" content={props.name} />
    </>
  )
}

export default ShowItem
