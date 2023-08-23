'use client'

import React, { useEffect } from 'react'
import useStore from '@/useStore'
import { AnimatePresence, motion } from 'framer-motion'

function Meaning() {
  const reading = useStore((state) => state.reading)
  const readingState = useStore((state) => state.readingState)

  useEffect(() => {}, [readingState])

  return (
    <AnimatePresence>
      <motion.div
        className='absolute w-screen h-screen flex items-center justify-center'
        key={readingState}
        initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)', x: 200 }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
        exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)', x: -200 }}
        transition={{ duration: 2, ease: 'backInOut' }}
      >
        <div className='relative w-[300px] h-fit text-neutral-200 bg-neutral-800 bg-opacity-90 flex justify-center items-center p-8'>
          {readingState > 0 ? (readingState !== 4 ? reading.cards[readingState - 1].meaning : reading.meaning) : null}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Meaning
