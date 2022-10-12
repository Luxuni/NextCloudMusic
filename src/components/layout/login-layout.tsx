import { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className="absolute inset-0 flex items-center justify-center">{children}</div>
}
