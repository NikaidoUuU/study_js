import React, { useState } from 'react'
import Quantity from './Quantity'
import { formatCurrency } from './utils'

function ProductItem({ name, price, imagePath }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="product-item">
      <img src={imagePath} alt={name} />
      <div>{name}</div>
      <div>{formatCurrency(price)}원</div>
      <div>
        <button
          onClick={() => {
            if (quantity < 0) {
              return alert('수량은 0보다 커야 합니다.')
            }
          }}
        >
          장바구니 업데이트
        </button>
        <div>
          <Quantity
            quantity={quantity}
            onChange={quantity => {
              setQuantity(quantity)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductItem
