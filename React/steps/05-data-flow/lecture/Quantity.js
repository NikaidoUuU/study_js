import React, { useState } from 'react'

function Quantity() {
  const [quantity, setQuantity] = useState(0)

  function subtract() {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  function add() {
    setQuantity(quantity + 1)
  }

  return (
    <div className="columns">
      <div>
        <button className="quantity-button" onClick={subtract} type="button">-</button>
      </div>
      <div>
        <input
          type="text"
          className="quantity"
          value={quantity}
          onChange={event => {
            setQuantity(event.target.value)
          }}
        />
      </div>
      <div>
        <button className="quantity-button" onClick={add} type="button">+</button>
      </div>
    </div>
  )
}

export default Quantity
