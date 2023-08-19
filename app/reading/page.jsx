'use client'

import React, { useEffect } from 'react'
import useStore from '../useStore'
import { generateCardLink, drawCards, tarotDeck } from '@/3DObjects/tarotDeckArray'
import { getCardMeaning } from './aiCalls'

function Reading(props) {
  const setReadingState = useStore((state) => state.setReadingState)

  const reading = useStore((state) => state.reading)
  const setReading = useStore((state) => state.setReading)

  useEffect(() => {
    console.log(reading.initialized)
    if (reading.cards.length === 0) {
      setReading({
        initialized: true,
        cards: drawCards(),
      })
    }
  }, [])

  useEffect(() => {
    if (reading.initialized) {
      const fetchData = async () => {
        const data = await getCardMeaning('The Hermit')
        console.log(data)
        return data
      }

      fetchData()
    }
  }, [reading])

  return (
    <div className='flex absolute w-screen bottom-0 justify-center items-center gap-8'>
      <button
        className='px-10 py-6 bg-neutral-800 bg-opacity-25 backdrop-blur-md text-white rounded-lg hover:bg-opacity-50 focus:outline-none transition duration-300'
        onClick={() => {
          setReadingState(0)
          console.log(generateCardLink(tarotDeck[36]))
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
    </div>
  )
}

export default Reading
