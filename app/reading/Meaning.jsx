'use client'

import React, { useEffect } from 'react'
import useStore from '@/useStore'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

function Meaning() {
  const reading = useStore((state) => state.reading)
  const readingState = useStore((state) => state.readingState)
  const setReadingState = useStore((state) => state.setReadingState)

  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    console.log(reading)
  }, [reading])

  const handleButton = (direction) => {
    setAnimating(false)
    setTimeout(() => {
      let newState = readingState
      if (direction === 'backward') {
        newState = Math.max(0, readingState - 1)
      } else if (direction === 'forward') {
        newState = Math.min(4, readingState + 1)
      }
      setReadingState(newState)
    }, 10)
  }

  return (
    <AnimatePresence>
      <div className='absolute bottom-[10%] md:bottom-[5%] flex justify-center items-center flex-col w-full '>
        <div className='w-full max-w-[600px] overflow-y-scroll overflow-x-hidden max-h-[40vh] md:max-h-[33.3vh] backdrop-blur-md rounded  flex justify-center items-center'>
          <motion.div
            className=' relative text-md md:text-lg lg:text-xl xl:text-2xl w-screen max-w-[600px] h-fit flex justify-center p-4 md:p-4 lg:p-6 z-60 bg-clip-text text-transparent'
            style={{
              backgroundImage: `url(./noise.png)`,
              filter: 'contrast(0.7) brightness(2)',
            }}
          >
            {readingState > 0 ? (readingState !== 4 ? reading.cards[readingState - 1].meaning : reading.meaning) : null}
          </motion.div>
        </div>

        <div className='flex z-100'>
          <button
            className='pt-2 w-full z-100 flex scale-75 flex-1 transition duration-800 '
            disabled={animating}
            onClick={() => handleButton('backward')}
          >
            <img className='h-8 w-full rotate-180' src='./arrow.svg' />
          </button>
          <button
            className='pt-2 w-full z-100 flex flex-1 transition duration-800 '
            disabled={animating}
            onClick={() => handleButton('forward')}
          >
            <img className='h-8 w-full' src='./arrow.svg' />
          </button>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default Meaning
