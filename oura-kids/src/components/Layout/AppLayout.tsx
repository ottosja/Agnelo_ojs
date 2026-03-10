import type { ReactNode } from 'react'
import BottomNav from '../Navigation/BottomNav'

interface Props {
  children: ReactNode
  hideNav?: boolean
}

export default function AppLayout({ children, hideNav = false }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 max-w-lg mx-auto relative">
      <main className={`flex-1 overflow-y-auto ${hideNav ? '' : 'pb-20'}`}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  )
}
