import { NextResponse } from 'next/server'

export async function POST(request) {
  const { orderID } = request.body
  console.log(orderID)

  const data = 'ok cool'

  return NextResponse.json(data)
}
