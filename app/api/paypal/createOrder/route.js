// Import necessary libraries and configurations
import { NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'
import client from '../client'

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST() {
  // SUPABASE
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase.from('trivisionusers').select()
  console.log(error)
  console.log(data)
  console.log(cookies)
  console.log('calling createorderAPI...')

  // Create the PayPal order
  try {
    const PaypalClient = client()
    //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
    const request = new paypal.orders.OrdersCreateRequest()
    request.headers['prefer'] = 'return=representation'
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '4.00',
          },
        },
      ],
    })
    const response = await PaypalClient.execute(request)
    if (response.statusCode !== 201) {
      res.status(500)
    }

    // Return the order ID to the client
    return NextResponse.json({ orderID: response.result.id, status: 'PENDING' })
  } catch (error) {
    // Handle any errors that occur during the order creation
    console.error('Error creating PayPal order:', error)
    return NextResponse.json({ error: 'Error creating PayPal order' }, { status: 500 })
  }
}
