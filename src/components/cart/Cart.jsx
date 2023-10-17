import React from 'react'
import "./Cart.css"
import Button from '../button/Button'
import { totalPrice } from '../units/total-price'
const Cart = ({cartItems,onChecKout}) => {
  return (
    <div className='cart_countener'>
      <p>
        Umumiy narx:{totalPrice(cartItems).toLocaleString('en-Us',{
            style:'currency',
            currency:'USD'
           })}
      </p>
    <Button title={`${cartItems.length ===0 ?'Buyurtma berish' :"To'lov"}`}
    disable ={cartItems.length===0 ?true:false}
     type={'checkout'}
           onClick={onChecKout}
     />
    </div>
  )
}

export default Cart