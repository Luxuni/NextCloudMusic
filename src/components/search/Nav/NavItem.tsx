import { NextPageWithLayout } from '../../../../pages/_app'

type NavItemProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  text: string
}

const NavItem: NextPageWithLayout<NavItemProps> = (props) => {
  return (
    <div className="flex justify-center items-center">
      <span>
        <props.icon fontSize={20} />
      </span>
      <span className="text-base">{props.text}</span>
    </div>
  )
}

export default NavItem
