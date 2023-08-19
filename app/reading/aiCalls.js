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
