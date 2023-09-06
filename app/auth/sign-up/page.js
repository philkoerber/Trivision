import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import SignUp from './SignUp'

export default async function SignInPage() {
  const supabase = createServerComponentClient({ cookies })

  return <SignUp />
}
