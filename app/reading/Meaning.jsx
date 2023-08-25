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
    let newState = readingState
    console.log('calling button')
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
        className='absolute w-screen h-1/2 bottom-0 flex flex-col items-center justify-center'
        key={readingState}
        initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)', x: 200, zIndex: 0 }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0, zIndex: 100 }}
        exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)', x: -200, zIndex: 0 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      >
        <div className='relative rounded-lg w-screen max-w-[600px] text-lg h-fit border-4 border-neutral-900 text-neutral-800 bg-neutral-300 bg-opacity-90 flex justify-center items-center p-6'>
          <button onClick={() => handleButton('backward')}>before</button>
          {readingState > 0 ? (readingState !== 4 ? reading.cards[readingState - 1].meaning : reading.meaning) : null}
          <button onClick={() => handleButton('forward')}>next</button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Meaning
