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
      <div className='absolute top-[60%] md:top-[65%] flex justify-center items-center flex-col-reverse gap-8 w-full'>
        <div className='w-full max-w-[600px] overflow-y-scroll overflow-x-hidden h-fit  max-h-[25vh] md:max-h-[25vh] scroll-smooth backdrop-blur-lg rounded-xl'>
          <motion.div
            key={readingState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4 }}
            className='relative text-md md:text-lg lg:text-xl flex justify-center z-60 bg-clip-text text-transparent p-8'
            style={{
              backgroundImage: `url(./noise.png)`,
              filter: 'contrast(0.6) brightness(0.5) invert(1)',
            }}
          >
            {readingState > 0 ? (readingState !== 4 ? reading.cards[readingState - 1].meaning : reading.meaning) : null}
          </motion.div>
        </div>

        <div className='flex gap-8 z-100'>
          <button
            className='pt-2 w-full z-100 flex flex-1 transition duration-800 hover:brightness-200'
            disabled={animating}
            onClick={() => handleButton('backward')}
          >
            <img className='h-8 w-full rotate-180' src='./arrow.svg' />
          </button>
          <button
            className='pt-2 w-full z-100 flex flex-1 transition duration-800 hover:brightness-200'
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
