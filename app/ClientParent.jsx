'use client'

import React from 'react'
import { Layout } from '@/components/dom/Layout'
import Scene from './Scene'

function ClientParent(props) {
  return (
    <div>
      <Layout>
        <Scene />
      </Layout>
    </div>
  )
}

export default ClientParent
