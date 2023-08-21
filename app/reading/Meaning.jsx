'use client'

import React, { useEffect } from 'react'
import useStore from '@/useStore'

function Meaning() {
  const reading = useStore((state) => state.reading)
  const readingState = useStore((state) => state.readingState)

  useEffect(() => {
    if (reading) console.log(reading.cards[readingState - 1])
  }, [readingState])

  return (
    <div className='absolute w-screen h-screen flex items-center justify-center'>
      <div className='relative w-[200px] h-fit bg-neutral-400 backdrop-blur-md bg-opacity-50 flex justify-center items-center '>
        {reading ? reading.cards[0].meaning : null}
      </div>
    </div>
  )
}

export default Meaning
