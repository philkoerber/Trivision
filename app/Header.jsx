'use client'

import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className='w-full bg-transparent absolute top-0 z-20 backdrop-blur-sm'>
      <nav className='container mx-auto flex items-center justify-between py-4'>
        <div>
          <Link href='/'>
            <p className='text-white text-xl font-bold'>Trivision</p>
          </Link>
        </div>
        <ul className='flex space-x-6 text-white'>
          <li>
            <button onClick={() => alert('click!')}>About</button>
          </li>
          <li></li>
          <li></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
