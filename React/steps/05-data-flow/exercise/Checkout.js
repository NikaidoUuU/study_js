import React from 'react'
import { formatCurrency } from './utils'

function Checkout({ cart = [] }) {
  function calculateTotal () {
    return cart.reduce((total, item) => total + (item.price) * item.quantity, 0)
  }

  return (
    <div>
      <h2>장바구니</h2>
      {Array.isArray(cart) && cart.length > 0 ? (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name}: {formatCurrency(item.price)}원 X {item.quantity} = {formatCurrency(item.price * item.quantity)}원
              </li>
            ))}
          </ul>
          <div>Total: {formatCurrency(calculateTotal())}원</div>
        </div>
      ) : (
        <div>장바구니가 비었습니다.</div>
      )}
    </div>
  )
}

export default Checkout
