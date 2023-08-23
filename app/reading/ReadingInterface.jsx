'use client'

import React, { useEffect } from 'react'
import useStore from '../useStore'
import { generateCardLink, drawCards, tarotDeck } from '@/3DObjects/tarotDeckArray'

function ReadingInterface({ cardsAndMeaning }) {
  const setReadingState = useStore((state) => state.setReadingState)

  const reading = useStore((state) => state.reading)
  const setReading = useStore((state) => state.setReading)

  useEffect(() => {
    if (!reading) {
      console.log('setting reading...')
      setReading(cardsAndMeaning)
    }
  }, [])

  useEffect(() => {
    console.log(reading)
  }, [reading])

  return (
    <div className='flex absolute z-[200] w-screen bottom-0 justify-center items-center gap-8'>
      <button
        className='px-10 py-6 bg-neutral-800 bg-opacity-25 backdrop-blur-md text-white rounded-lg hover:bg-opacity-50 focus:outline-none transition duration-300'
        onClick={() => {
          setReadingState(0)
        }}
      >
        0
      </button>
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
      <button
        className='px-10 py-6 bg-neutral-800 bg-opacity-25 backdrop-blur-md text-white rounded-lg hover:bg-opacity-50 focus:outline-none transition duration-300'
        onClick={() => {
          setReadingState(4)
        }}
      >
        4
      </button>
    </div>
  )
}

export default ReadingInterface
