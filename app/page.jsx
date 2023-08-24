'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useStore from './useStore'

export default function Page() {
  const reading = useStore((state) => state.reading)
  const setReading = useStore((state) => state.setReading)
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(!reading) // Initialize isLoading based on whether reading is available

  useEffect(() => {
    if (!reading && isLoading) {
      setIsLoading(true) // Set isLoading to true when fetchData is triggered
      async function fetchData() {
        try {
          console.log('calling for the reading...')
          const response = await fetch('/api', { cache: 'no-store' }) // Adjust the endpoint URL
          const data = await response.json()
          console.log(data)
          setReading(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setIsLoading(false) // Set isLoading to false when fetching is done (success or failure)
        }
      }
      fetchData()
    } else {
      console.log('you have a reading already!')
    }
  }, [reading, isLoading]) // Add reading and isLoading to the dependency array

  return (
    <motion.div key='welcome' className='flex justify-center items-center h-screen w-screen'>
      <div className='h-fit w-fit p-11 bg-transparent flex flex-col items-center justify-center text-white rounded-md gap-8'>
        {/* Content for the inner div */}

        <img src='/welcome.svg' className='w-[70%]' />

        <div>
          <p className='text-white text-center'>Your three-card spread awaits you.</p>
          <p className='text-white text-center'>Get insights and guidance.</p>
        </div>

        <button
          className='px-10 py-6 bg-neutral-800 bg-opacity-25 backdrop-blur-md text-white rounded-lg hover:bg-opacity-50 focus:outline-none transition duration-300'
          onClick={() => router.push('/reading')}
        >
          Start Reading...
        </button>
      </div>
    </motion.div>
  )
}
