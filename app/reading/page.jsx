import React from 'react'
import ReadingInterface from './ReadingInterface'
import { getCardMeaning } from './aiCalls'

async function Reading(props) {
  const config = {
    FLOWISE_KEY: process.env.FLOWISE_KEY,
    FLOWISE_URI: process.env.FLOWISE_URI,
  }
  const meaning = await getCardMeaning('Eight Of Swords', config)
  console.log(meaning)

  return (
    <div>
      <ReadingInterface />
    </div>
  )
}

export default Reading
