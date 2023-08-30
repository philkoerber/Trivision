import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function getThreeCardsMeaning(cards, config) {
  const body = JSON.stringify({ question: cards })

  try {
    const response = await fetch(config.FLOWISE_URI_2, {
      headers: {
        Authorization: 'Bearer ' + config.FLOWISE_KEY,

        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body,
    })
    const responseText = await response.text()
    const result = JSON.parse(responseText)
    return result
  } catch (e) {
    console.log(e)
  }
}

export async function getCardMeaning(card, config) {
  const body = JSON.stringify({ question: card })

  try {
    const response = await fetch(config.FLOWISE_URI, {
      headers: {
        Authorization: 'Bearer ' + config.FLOWISE_KEY,

        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body,
    })
    const responseText = await response.text()
    const result = JSON.parse(responseText)
    return result
  } catch (e) {
    console.log(e)
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const card = searchParams.get('card')
  const wantReadingMeaning = searchParams.get('readingMeaning')
  const config = {
    FLOWISE_KEY: process.env.FLOWISE_KEY,
    FLOWISE_URI: process.env.FLOWISE_URI,
    FLOWISE_URI_2: process.env.FLOWISE_URI_2,
  }
  let meaning = ''
  if (!wantReadingMeaning) {
    meaning = await getCardMeaning(card, config)
  }
  if (wantReadingMeaning) {
    meaning = await getThreeCardsMeaning(card, config)
  }

  return NextResponse.json(meaning)
}
