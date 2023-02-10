import { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen flex text-theme-text items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      {children}
    </div>
  )
}
