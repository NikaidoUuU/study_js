import React from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

export default function CheckoutForm () {
  return (
    <form autoComplete="off">
      <div>
        <label htmlFor="username">이름</label>
        <input id="username" type="text" name="username" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="tel">전화번호</label>
        <input id="tel" type="text" name="tel" />
      </div>
    </form>
  )
}

ReactDOM.render(<CheckoutForm />, document.getElementById('root'))
