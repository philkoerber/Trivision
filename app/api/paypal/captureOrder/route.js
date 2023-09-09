import { NextResponse } from 'next/server'

import client from '../client'
import paypal from '@paypal/checkout-server-sdk'

export async function POST(request) {
  console.log('calling captureorderAPI...')

  // Create the PayPal order
  try {
    //Capture order to complete payment
    const { orderID } = await request.json()
    const PaypalClient = client()
    const captureRequest = new paypal.orders.OrdersCaptureRequest(orderID)
    captureRequest.requestBody({})
    const response = await PaypalClient.execute(captureRequest)

    // Return the order ID to the client
    return NextResponse.json({ orderID: orderID, status: 'PAID' })
  } catch (error) {
    // Handle any errors that occur during the order creation
    console.error('Error capturing PayPal order:', error)
    return NextResponse.json({ error: 'Error capturing PayPal order' }, { status: 500 })
  }
}
