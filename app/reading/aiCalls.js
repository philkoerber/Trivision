export async function getCardMeaning(data) {
  const body = JSON.stringify(data)

  try {
    const response = await fetch(
      'https://flowise-ph0q.onrender.com/api/v1/prediction/c7ba7be9-61b0-4830-902a-ed39c267a2cd',
      {
        headers: {
          Authorization: 'Bearer 3P37AjnkcoaCehZyBvHSXSafvTemC50Gl59cvgBBzZU=',

          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
      },
    )
    const result = await response.json()
    return result
  } catch (e) {
    console.log(e)
  }
}
