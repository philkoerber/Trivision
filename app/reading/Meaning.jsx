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
    setAnimating(true)
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
      <motion.div
        className='absolute w-screen h-1/2 bottom-0 flex flex-col items-center justify-center'
        key={readingState}
        initial={{ opacity: 0, scale: 1.2, x: 100, zIndex: 200 }}
        animate={{ opacity: 1, scale: 1, x: 0, zIndex: 100 }}
        exit={{ opacity: 0, scale: 0, x: -100, filter: 'blur(100px)', zIndex: 0 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          setAnimating(false)
        }}
      >
        <div className='bg-[#94977f] rounded border-4 border-black relative w-full max-w-[600px]'>
          <div
            className='rounded w-full h-full absolute bg-cover mix-blend-screen'
            style={{
              backgroundImage: 'url(./noise.png)',
              filter: 'contrast(0.5)',
            }}
          ></div>
          <div className=''>
            <motion.div
              className=' relative text-md md:text-lg lg:text-xl xl:text-2xl text-xl w-screen max-w-[600px] h-fit flex justify-center p-2 md:p-4 lg:p-6 z-60 bg-clip-text text-transparent'
              style={{
                backgroundImage: `url(./noise.png)`,
                filter: 'contrast(1) brightness(0.4)',
              }}
            >
              {readingState > 0
                ? readingState !== 4
                  ? reading.cards[readingState - 1].meaning
                  : reading.meaning
                : null}
            </motion.div>
          </div>
        </div>

        <div className='flex gap-10 items-center justify-center'>
          <button
            className='pt-2 w-full z-100 flex justify-center disabled:opacity-0 enabled:opacity-100 transition duration-800 '
            disabled={animating}
            onClick={() => handleButton('backward')}
          >
            <img className='h-8 w-full rotate-180' src='./arrow.svg' />
          </button>
          <button
            className='pt-2 w-full z-100 flex justify-center disabled:opacity-0 enabled:opacity-100 transition duration-800 '
            disabled={animating}
            onClick={() => handleButton('forward')}
          >
            <img className='h-8 w-full' src='./arrow.svg' />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Meaning
