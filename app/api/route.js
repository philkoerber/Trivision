import { NextResponse } from 'next/server'

import { drawCards } from './tarotDeckArray'

export const runtime = 'edge'

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const threeCards = drawCards()

  const cardsAndMeaning = {
    cards: [
      {
        card: threeCards[0],
        meaning: '',
      },
      {
        card: threeCards[1],
        meaning: '',
      },
      {
        card: threeCards[2],
        meaning: '',
      },
    ],
    meaning: '',
  }

  return NextResponse.json(cardsAndMeaning)
}
