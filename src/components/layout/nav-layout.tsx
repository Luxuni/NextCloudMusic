import { ReactNode } from 'react'
import NavigationSection from '../NavigationSection'

export default function NavLayout({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0">
      {/* content */}
      {children}
      <NavigationSection />
    </div>
  )
}
