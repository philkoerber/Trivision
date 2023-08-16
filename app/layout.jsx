'use client'

import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import Header from './Header'
import Reading from './Reading'
import Scene from './Scene'
export const metadata = {
  title: 'Trivision',
  description: 'Your three card spread waits for you...',
}

import { AnimatePresence } from 'framer-motion'
import Transition from './Transition'

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Header />

        <div className='absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Transition>{children}</Transition>
        </div>

        <Layout>
          <Scene />
        </Layout>

        <Reading />
      </body>
    </html>
  )
}
