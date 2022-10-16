import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import NavigationSection from '../NavigationSection'
import Player from '../player'

export default function NavLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const isNavigationSectionMap = new Map([
    ['/home', true],
    ['/search', false],
    ['/mine', true],
  ])

  return (
    <>
      {/* content */}
      {children}
      <Player bottom={isNavigationSectionMap.get(router.pathname) ? 'bottom-20' : 'bottom-0'} />
      {isNavigationSectionMap.get(router.pathname) && <NavigationSection />}
    </>
  )
}
