import React from 'react'
import PaymentForm from './PaymentForm'

async function profile(props) {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientToken = process.env.PAYPAL_SECRET_KEY

  return (
    <div className='w-[500px] text-white bg-transparent backdrop-blur-md flex flex-col gap-4 border-2 border-stone-400 p-4'>
      <div>Hello!</div>
      <div>Tokens: 0</div>
      <div>Readings: 100</div>
      <div className='flex justify-center items-center flex-col'>
        <div>Get some readings....</div>
        <PaymentForm clientId={clientId} clientToken={clientToken} />
      </div>
    </div>
  )
}

export default profile
