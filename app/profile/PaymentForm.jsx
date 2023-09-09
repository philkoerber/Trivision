'use client'

import React, { useState } from 'react'

import { PayPalScriptProvider, PayPalButtons, FUNDING } from '@paypal/react-paypal-js'

function PaymentForm(props) {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState('')
  const [orderID, setOrderID] = useState(false)

  const createOrder = async () => {
    try {
      const response = await fetch('/api/paypal/createOrder/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error creating PayPal order')
      }

      const data = await response.json()

      if (data.orderID) {
        setOrderID(data.orderID)
        return data.orderID
      } else {
        throw new Error('Order ID not received')
      }
    } catch (error) {
      console.error('Error creating PayPal order:', error)
      setErrorMessage('An error occurred')
    }
  }

  // check Approval
  const onApprove = async (data, actions) => {
    console.log('order id to catch: ' + data.orderID)
    try {
      const response = await fetch('/api/paypal/captureOrder/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { orderID: data.orderID },
      })

      const capturedOrderData = await response.json()

      if (capturedOrderData) {
        console.log('captured order!')
        console.log(capturedOrderData)
      } else {
        throw new Error('Order ID not received')
      }
    } catch (error) {
      console.error('Error capturing PayPal order:', error)
      setErrorMessage('An error occurred')
    }
  }

  //capture error
  const onError = (data, actions) => {
    setErrorMessage('An Error occured with your payment ')
  }

  return (
    <div className='w-[200px] h-[300px] flex justify-center items-center'>
      <PayPalScriptProvider options={{ 'client-id': props.clientID, currency: 'USD' }}>
        <PayPalButtons
          style={{
            color: 'gold',
            shape: 'rect',
            label: 'pay',
            height: 50,
          }}
          fundingSource={FUNDING.PAYPAL}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default PaymentForm
