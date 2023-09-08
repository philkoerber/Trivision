'use client'

import React, { useState } from 'react'

import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
  PayPalButtons,
} from '@paypal/react-paypal-js'

function PaymentForm(props) {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState('')
  const [orderID, setOrderID] = useState(false)

  const createOrder = (data, actions) => {
    console.log('calling create order')
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Sunflower',
            amount: {
              currency_code: 'USD',
              value: 4,
            },
          },
        ],
      })
      .then((orderID) => {
        fetch('/api/paypal/createOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderID: orderID,
            userID: '12345', // Replace with the user's ID
          }),
        }).then((response) => console.log(response))
        return orderID
      })
  }

  // check Approval
  const onApprove = (data, actions) => {
    console.log('calling onApprove')

    return actions.order.capture().then(function (details) {
      console.log(details)
      setSuccess(true)
    })
  }

  //capture error
  const onError = (data, actions) => {
    setErrorMessage('An Error occured with your payment ')
  }

  return (
    <div className='w-[200px] h-[300px] flex justify-center items-center'>
      <PayPalScriptProvider>
        <PayPalButtons style={{ layout: 'vertical' }} createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  )
}

export default PaymentForm
