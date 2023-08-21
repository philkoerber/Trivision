import React from 'react'
import Meaning from './Meaning'

function layout({ children }) {
  return (
    <div>
      {children}
      <Meaning />
    </div>
  )
}

export default layout
