import { NextResponse } from 'next/server'

import { drawCards } from '@/3DObjects/tarotDeckArray'
import { getCardMeaning, getThreeCardsMeaning } from './aiCalls'

export async function GET() {
  console.log('generating card draw')
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

  return NextResponse.json(cardsAndMeaning)
}
