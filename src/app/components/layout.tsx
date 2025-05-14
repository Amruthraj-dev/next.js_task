import { ReactNode } from 'react'
import Sidebar from './sidebar'
import Header from './Header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
      <div className="flex flex-col flex-1 h-screen relative">
        <header className="backdrop-blur-md bg-white/70 w-full shadow-sm text-gray-100 flex justify-between items-center sticky top-0 z-30">
          <Header/>
        </header>
          <div className="flex h-[calc(100vh-80px)] bg-fuchsia-500">

               <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 ">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
