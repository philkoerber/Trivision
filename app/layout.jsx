import '@/global.css'
import Header from './Header'

export const metadata = {
  title: 'Trivision',
  description: 'Your three card spread waits...',
}

import { Vollkorn } from '@next/font/google'

const vollkorn = Vollkorn({
  subsets: ['latin'],
  weight: ['400', '800'],
})

import ClientParent from './ClientParent'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthProvider from '@/components/AuthProvider'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token || null

  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={vollkorn.className}>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Header />

        <div className='absolute z-10 w-screen h-screen'>
          <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
        </div>
        <ClientParent />
      </body>
    </html>
  )
}
