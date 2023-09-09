import React from 'react'
import PaymentForm from './PaymentForm'
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

async function profile(props) {
  const clientID = process.env.PAYPAL_CLIENT_ID
  const clientToken = process.env.PAYPAL_SECRET_KEY

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/sign-up')
  } else {
    return (
      <div className='w-[500px] text-white bg-transparent backdrop-blur-md flex flex-col gap-4 border-2 border-stone-400 p-4'>
        <div>Hello!</div>
        <div>Tokens: 0</div>
        <div>Readings: 100</div>
        <div className='flex justify-center items-center flex-col gap-2'>
          <div>Get some readings....</div>
          <PaymentForm clientID={clientID} clientToken={clientToken} userID={user.identities.user_id} />
        </div>
      </div>
    )
  }
}

export default profile
