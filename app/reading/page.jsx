'use client'

import React from 'react'
import useStore from '../useStore'

function page(props) {
  const setReadingState = useStore((state) => state.setReadingState)

  return (
    <div className='flex flex-col gap-8'>
      <button
        className='px-10 py-6 bg-neutral-800 bg-opacity-25 backdrop-blur-md text-white rounded-lg hover:bg-opacity-50 focus:outline-none transition duration-300'
        onClick={() => {
          setReadingState(1)
        }}
      >
        1
      </button>

      <button
        className='px-10 py-6 bg-neutral-800 bg-opacity-25 backdrop-blur-md text-white rounded-lg hover:bg-opacity-50 focus:outline-none transition duration-300'
        onClick={() => {
          setReadingState(2)
        }}
      >
        2
      </button>

      <button
        className='px-10 py-6 bg-neutral-800 bg-opacity-25 backdrop-blur-md text-white rounded-lg hover:bg-opacity-50 focus:outline-none transition duration-300'
        onClick={() => {
          setReadingState(3)
        }}
      >
        3
      </button>
    </div>
  )
}

export default page
