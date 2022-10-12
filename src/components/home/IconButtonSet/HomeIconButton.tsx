import { NextPageWithLayout } from '../../../../pages/_app'

type HomeIconButtonType = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  text: string
}
const HomeIconButton: NextPageWithLayout<HomeIconButtonType> = (props) => {
  return (
    <div className="h-16 w-1/5 flex flex-col  shrink-0">
      {/* icon */}
      <div className="h-2/3 flex items-center justify-center">
        <props.icon fontSize={28} />
      </div>
      {/* text */}
      <div className="h-1/3 text-center">
        <span>{props.text}</span>
      </div>
    </div>
  )
}

export default HomeIconButton
