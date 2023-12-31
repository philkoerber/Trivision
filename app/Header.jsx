'use client'

import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className='w-full bg-transparent absolute top-0 z-20 backdrop-blur-sm p-2'>
      <nav className='container mx-auto flex items-center justify-between py-4'>
        <div>
          <Link href='/'>
            <p className='text-white text-2xl font-bold'>TRIVISION</p>
          </Link>
        </div>
        <ul className='flex text-white'>
          <li>
            <Link href='/profile'>
              <p className='text-white font-bold'>PROFILE</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
