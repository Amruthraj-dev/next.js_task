'use client'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'

const Header: React.FC = () => {
  return (
    <header className="flex backdrop-blur-xl justify-between bg-linear-to-br from-violet-500 to-fuchsia-500 items-center w-full p-4  sticky top-0 z-10">
      <div>
       <Link href="/" className='text-2xl'>Dashboard</Link>
        </div>
      <input
        type="text"
        placeholder="Global Search"
        className="border p-2 outline-none text-gray-100   rounded w-1/2"
      />
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center  space-x-2 border p-2 px-4 rounded hover:text-fuchsia-500 hover:bg-gray-50">
          <span>User</span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-30 bg-white shadow-lg px-7 ring-opacity-5 rounded-md focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    className={`block w-full text-fuchsia-500 text-left p-2 ${
                      active ? 'bg-gray-100' : ''
                    }`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    className={`block w-full text-fuchsia-500 text-left p-2 ${
                      active ? 'bg-gray-100' : ''
                    }`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  )
}

export default Header
