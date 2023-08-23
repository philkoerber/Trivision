import '@/global.css'
import Header from './Header'

export const metadata = {
  title: 'Trivision',
  description: 'Your three card spread waits for you...',
}

import ClientParent from './ClientParent'

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

        <div className='absolute z-10 w-screen h-screen'>{children}</div>
        <ClientParent />
      </body>
    </html>
  )
}
