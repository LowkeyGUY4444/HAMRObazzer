import React from 'react'
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';

const PaypalButton = ({amount, onSuccess, onError}) => {
  return (
    <PayPalScriptProvider options={{ 
     // "client-id":process.env.REACT_APP_PAYPAL_CLIENT_ID,
      "client-id": "AbhQlGDJ5eYa-E34PPe-lh8svScLXchCSmKGXIFtPaRvYJfON2fj5D27PC0p0O0B7ESGOZcahAXVDivx",
       }}>
        <PayPalButtons style={{layout: 'vertical'}}>
             createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {amount: {value: parseFloat(amount).toFixed(2)}}]   
                })
             }}
             onApprove={(data, actions) => {
                return actions.order.capture().then(onSuccess);
             }}
             onError={(err) => {
                console.log(err);
                alert("payment Unsuccessful! Try again")
             }}

        </PayPalButtons>


    </PayPalScriptProvider>

  )
}

export default PaypalButton
