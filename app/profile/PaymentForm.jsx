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
        setOrderID(orderID)
        return orderID
      })
  }

  // check Approval
  const onApprove = (data, actions) => {
    console.log('calling onApprove')

    return actions.order.capture().then(function (details) {
      const { payer } = details
      setSuccess(true)
    })
  }

  //capture error
  const onError = (data, actions) => {
    setErrorMessage('An Error occured with your payment ')
  }

  return (
    <div className='w-1/2 m-auto'>
      <PayPalScriptProvider>
        <PayPalButtons style={{ layout: 'vertical' }} createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  )
}

export default PaymentForm
