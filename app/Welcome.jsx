import React from 'react'
import { useRouter } from 'next/navigation'
const router = useRouter()

function Welcome(props) {
  return (
    <div className='h-fit w-fit p-11 bg-transparent flex flex-col items-center justify-center text-white rounded-md gap-8'>
      <div className='relative flex justify-center items-center bg-cover'>
        <img src='/welcome.svg' className='w-[99%] relative invert blur-md scale-105' />
        <img src='/welcome.svg' className='absolute' />
      </div>

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
  )
}

export default Welcome
