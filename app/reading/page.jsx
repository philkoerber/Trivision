import React from 'react'
import ReadingInterface from './ReadingInterface'
import { getCardMeaning, getThreeCardsMeaning } from './aiCalls'
import { drawCards } from '@/3DObjects/tarotDeckArray'

async function Reading(props) {
  const config = {
    FLOWISE_KEY: process.env.FLOWISE_KEY,
    FLOWISE_URI: process.env.FLOWISE_URI,
    FLOWISE_URI_2: process.env.FLOWISE_URI_2,
  }

  const threeCards = drawCards()
  const cardsAndMeaning = {
    cards: [
      {
        card: threeCards[0],
        meaning: await getCardMeaning(threeCards[0], config),
      },
      {
        card: threeCards[1],
        meaning: await getCardMeaning(threeCards[1], config),
      },
      {
        card: threeCards[2],
        meaning: await getCardMeaning(threeCards[2], config),
      },
    ],
    meaning: await getThreeCardsMeaning(threeCards.join(), config),
  }

  return (
    <div>
      <ReadingInterface cardsAndMeaning={cardsAndMeaning} />
    </div>
  )
}

export default Reading
