import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectPlayer } from '../../features/player/playerSlice'
import NavigationSection from '../NavigationSection'
import Player from '../player'

export default function NavLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const player = useAppSelector(selectPlayer)
  const isShowPlayer = player.length > 0

  const isNavigationSectionMap = new Map([
    ['/home', true],
    ['/search', false],
    ['/mine', true],
  ])

  return (
    <>
      {/* content */}
      {children}
      {isShowPlayer && <Player bottom={isNavigationSectionMap.get(router.pathname) ? 'bottom-20' : 'bottom-0'} />}
      {isNavigationSectionMap.get(router.pathname) && <NavigationSection />}
    </>
  )
}
