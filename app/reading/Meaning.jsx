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

  useEffect(() => {}, [readingState])

  const handleButton = (direction) => {
    setAnimating(true)
    let newState = readingState
    if (direction === 'backward') {
      newState = Math.max(0, readingState - 1)
    } else if (direction === 'forward') {
      newState = Math.min(4, readingState + 1)
    }

    setReadingState(newState)
  }

  return (
    <AnimatePresence>
      <motion.div
        className='absolute w-screen h-1/2 bottom-0 flex items-center justify-center mix-blend-multiply'
        key={readingState}
        initial={{ opacity: 0, scale: 1.2, filter: 'blur(5px)', x: 100, zIndex: 50 }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0, zIndex: 100 }}
        exit={{ opacity: 0, scale: 0.5, filter: 'blur(5px)', x: -100, zIndex: 0 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          setAnimating(false)
        }}
      >
        <button
          className='p-4 font-bold z-100 flex justify-center disabled:opacity-0 transition duration-200 '
          disabled={animating}
          onClick={() => handleButton('forward')}
        >
          <img className='h-8 w-8 rotate-180' src='./arrow.svg' />
        </button>

        {/* Apply blend effect only to this text container */}
        <motion.div
          className=' relative text-lg font-bold w-screen max-w-[600px] h-fit flex justify-center p-6 z-60 bg-clip-text text-transparent'
          style={{
            backgroundImage: `url(./noise.png)`,
          }}
        >
          {readingState > 0 ? (readingState !== 4 ? reading.cards[readingState - 1].meaning : reading.meaning) : null}
        </motion.div>

        <button
          className='p-4 font-bold z-100 flex justify-center disabled:opacity-0 transition duration-400 '
          disabled={animating}
          onClick={() => handleButton('forward')}
        >
          <img className='h-8 w-8' src='./arrow.svg' />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

export default Meaning
