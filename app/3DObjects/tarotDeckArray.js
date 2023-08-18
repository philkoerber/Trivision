export function generateCardLink(cardName) {
  const baseURL = 'https://pnzrzewseaycfpwvtswx.supabase.co/storage/v1/object/public/RiderWaiteTarot/'
  const encodedCardName = encodeURIComponent(cardName)
  const link = `${baseURL}${encodedCardName}`
  return link
}

export const tarotDeck = [
  'Ace Of Cups',
  'Ace Of Pentacles',
  'Ace Of Swords',
  'Ace Of Wands',
  'Death',
  'Eight Of Cups',
  'Eight Of Pentacles',
  'Eight Of Swords',
  'Eight Of Wands',
  'Five Of Cups',
  'Five Of Pentacles',
  'Five Of Swords',
  'Five Of Wands',
  'Four Of Cups',
  'Four Of Pentacles',
  'Four Of Swords',
  'Four Of Wands',
  'Judgement',
  'Justice',
  'King Of Cups',
  'King Of Pentacles',
  'King Of Swords',
  'King Of Wands',
  'Knight Of Cups',
  'Knight Of Pentacles',
  'Knight Of Swords',
  'Knight Of Wands',
  'Nine Of Cups',
  'Nine Of Pentacles',
  'Nine Of Swords',
  'Nine Of Wands',
  'Page Of Cups',
  'Page Of Pentacles',
  'Page Of Swords',
  'Page Of Wands',
  'Queen Of Cups',
  'Queen Of Pentacles',
  'Queen Of Swords',
  'Queen Of Wands',
  'Seven Of Cups',
  'Seven Of Pentacles',
  'Seven Of Swords',
  'Seven Of Wands',
  'Six Of Cups',
  'Six Of Pentacles',
  'Six Of Swords',
  'Six Of Wands',
  'Strength',
  'Temperance',
  'Ten Of Cups',
  'Ten Of Pentacles',
  'Ten Of Swords',
  'Ten Of Wands',
  'The Chariot',
  'The Devil',
  'The Emperor',
  'The Empress',
  'The Fool',
  'The Hanged Man',
  'The Hermit',
  'The Hierophant',
  'The High Priestess',
  'The Lovers',
  'The Star',
  'The Magician',
  'The Moon',
  'The Sun',
  'The Tower',
  'The World',
  'Three Of Cups',
  'Three Of Pentacles',
  'Three Of Swords',
  'Three Of Wands',
  'Two Of Cups',
  'Two Of Pentacles',
  'Two Of Swords',
  'Two Of Wands',
  'Wheel Of Fortune',
]

export function drawCards() {
  const drawing = []

  while (drawing.length < 3) {
    const randomNumber = Math.floor(Math.random() * tarotDeck.length) // Generates a random number between 0 and 77
    if (!drawing.includes(tarotDeck[randomNumber])) {
      drawing.push(tarotDeck[randomNumber])
    }
  }

  return drawing
}
