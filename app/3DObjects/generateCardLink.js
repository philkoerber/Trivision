export function generateCardLink(cardName) {
  const baseURL = 'https://pnzrzewseaycfpwvtswx.supabase.co/storage/v1/object/public/RiderWaiteTarot/'
  const encodedCardName = encodeURIComponent(cardName)
  const link = `${baseURL}${encodedCardName}`
  return link
}
