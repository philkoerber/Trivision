import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Welcome from './Welcome'

export default async function Page() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/sign-up')
  }

  return (
    <div key='welcome' className='flex justify-center items-center h-screen w-screen'>
      <Welcome />
    </div>
  )
}
