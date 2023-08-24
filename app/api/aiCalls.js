export async function getCardMeaning(card, config) {
  const body = JSON.stringify({ question: card })

  try {
    const response = await fetch(config.FLOWISE_URI, {
      cache: 'no-cache',
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

export async function getThreeCardsMeaning(cards, config) {
  console.log(cards, config)
  const body = JSON.stringify({ question: cards })

  try {
    const response = await fetch(config.FLOWISE_URI_2, {
      cache: 'no-cache',
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
