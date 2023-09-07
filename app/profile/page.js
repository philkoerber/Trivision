import React from 'react'
import PaymentForm from './PaymentForm'

function page(props) {
  const clientId = 'okcool'
  const clientToken = 'yeahthatsnice'

  return (
    <div className='w-[500px] bg-neutral-500 flex flex-col gap-4'>
      <div>Hello!</div>
      <div>Tokens: 0</div>
      <div>Readings: 100</div>
      <div>
        <PaymentForm clientId={clientId} clientToken={clientToken} />
      </div>
    </div>
  )
}

export default page
