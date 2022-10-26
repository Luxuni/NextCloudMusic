import Link from 'next/link'
import { NextPageWithLayout } from '../../../pages/_app'
import { useRouter } from 'next/router'

type NavigationItemProps = {
  title: string
  route: string
  icon: React.FC<{ active: boolean }>
}

const NavigationItem: NextPageWithLayout<NavigationItemProps> = (props) => {
  const router = useRouter()

  return (
    <Link href={props.route}>
      <div className="h-4/5 aspect-square flex flex-col items-center justify-center">
        {/* icon */}
        <props.icon active={router.pathname === props.route} />
        {/* title */}
        <div className={router.pathname === props.route ? 'mt-2 text-xs text-red-700' : 'mt-2 text-xs text-gray-500'}>
          {props.title}
        </div>
      </div>
    </Link>
  )
}

export default NavigationItem
