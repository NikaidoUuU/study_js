# Controlled Component vs Uncontrolled Component

사용자가 입력하는 입력값을 처리할때, 우리는 두 가지 방법을 고려할 수 있습니다. 그 두 가지가 바로 "Controlled"와 "Uncontrolled"입니다.

- "Uncontrolled Component"란, 사용자에 의해서 화면에 보여지는 값이 변하는 방식입니다.
- "Controlled Component"란, 컴포넌트 내부 로직에 의해서 화면에 보여지는 값이 변하는 방식입니다.

"Controlled" 방식의 컴포넌트가 필요한 경우는 사용자의 입력값을 변환하여 보여주어야 하거나 또 다른 어떤 처리를 통해서 화면에 보여주어야 하는 경우입니다.

```js
// Uncontrolled
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

// Controlled
export default function CheckoutForm () {
  const [name, setName] = useState('')
  const [tel, setTel] = useState('')

  return (
    <form autoComplete="off">
      <div>
        <label htmlFor="username">이름</label>
        <input id="username" value={name} onChange={(e) => setName(e.target.value)} type="text" name="username" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="tel">전화번호</label>
        <input id="tel" value={tel} onChange={(e) => setTel(e.target.value)} type="text" name="tel" />
      </div>
    </form>
  )
}
```
