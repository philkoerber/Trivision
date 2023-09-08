'use client'

import React, { useEffect, useState } from 'react'
import useStore from '@/useStore'
import { AnimatePresence, motion } from 'framer-motion'

import { Mrs_Saint_Delafield } from '@next/font/google'

const delafield = Mrs_Saint_Delafield({
  subsets: ['latin'],
  weight: ['400'],
})

function Meaning() {
  const reading = useStore((state) => state.reading)
  const lastClickedCard = useStore((state) => state.clickedCards.lastClickedCard)
  const clickedCardsList = useStore((state) => state.clickedCards.clickedCardsList)
  const clickACard = useStore((state) => state.clickACard)

  const [showMeaning, setShowMeaning] = useState(false)
  const [showMeaningButton, setShowMeaningButton] = useState(false)

  const handleMeaningButton = () => {
    setShowMeaning(true)
  }

  useEffect(() => {
    setShowMeaning(false)

    if (reading) {
      if (reading.cards.length === clickedCardsList.length) {
        setShowMeaningButton(true)
      }
    }
  }, [lastClickedCard])

  return (
    <AnimatePresence>
      {/* INTERPRETATIONBUTTON */}
      <motion.div
        className='absolute top-[50vh] md:top-[59vh] z-[200] w-screen flex justify-center overflow-clip'
        initial={{ opacity: 0, x: 100, scale: 0.8, filter: 'blur(10px)', zIndex: 5 }}
        animate={
          showMeaningButton
            ? { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, x: 100, scale: 0.8, filter: 'blur(10px)', zIndex: 5 }
        }
        transition={{ duration: 3 }}
      >
        <div
          className='relative text-stone-800 bg-gradient-to-t from-stone-200 via-stone-300 to-stone-400 p-2 w-fit h-10 flex justify-center items-center font-semibold rounded border-2 border-stone-600 overflow-clip'
          onClick={handleMeaningButton}
        >
          <img className='w-full  h-full absolute mix-blend-overlay opacity-40 rounded-lg' src='/noise.png' />
          READ THE MEANING...
          <div
            className={delafield.className + ' absolute font-semibold text-[800%] opacity-10 leading-none select-none'}
          >
            Meaning
          </div>
        </div>
      </motion.div>

      {/* TEXTBOXMEANING */}

      <motion.div
        key={lastClickedCard + showMeaning + reading}
        className='absolute top-[55vh] md:top-[65vh] w-screen z-[200] flex justify-center overflow-clip'
        initial={{ opacity: 0, x: 100, scale: 0.8, filter: 'blur(10px)', zIndex: 5 }}
        animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', zIndex: 10 }}
        exit={{ opacity: 0, x: -100, scale: 0.8, filter: 'blur(10px)', zIndex: 5 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <div className='relative flex md:max-w-[600px] justify-center items-center flex-col px-4 py-6 md:rounded-lg bg-gradient-to-t from-stone-200 via-stone-300 to-stone-400 md:border-4 border-stone-600'>
          <img className='w-full h-full absolute mix-blend-overlay opacity-40 rounded-lg' src='/noise.png' />
          {showMeaning ? (
            <div>{reading.meaning}</div>
          ) : (
            <>
              <div
                className={delafield.className + ' absolute font-bold text-[800%] opacity-10 leading-none select-none'}
              >
                {lastClickedCard > 0 ? reading.cards[lastClickedCard - 1].card : null}
              </div>
              <div className='text-lg md:text-xl lg:text-xl text-stone-900'>
                {lastClickedCard > 0 ? reading.cards[lastClickedCard - 1].meaning : null}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Meaning
