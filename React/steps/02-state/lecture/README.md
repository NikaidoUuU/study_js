# States

상황에 따라 우리는 가변적인 정보를 UI에 보여주어야 할 수도 있습니다. UI의 상태를 관리할 수 있는 방법이 바로 `state` 입니다.

아래와 같은 컴포넌트가 있다고 생각해보세요.

```jsx
export default function ShoppingItem (props) {
  const {
    name,
    price
  } = props.item

  return (
    <div>
      <h3>{name}</h3>
      <h4>{price}원</h4>
      <div>
        <div>-</div>
        <div>1</div>
        <div>+</div>
      </div>
    </div>
  )
}
```

사용자가 더하기, 빼기 버튼을 클릭할때마다 우리는 수량의 값을 변경시켜 UI에 반영하고 싶습니다. 이와 같은 상황에서 우리는 `useState`라는 함수를 이용하여 수량을 가변적인 상태값으로 관리할 수 있습니다. `useState`를 적용하여 초기 수량을 1로 표기하기 위해서 아래와 같이 수정할 수 있습니다.

```jsx
export default function ShoppingItem (props) {
  const {
    name,
    price
  } = props.item
  const [quantity, setQuantity] = useState(1)

  return (
    <div>
      <h3>{name}</h3>
      <h4>{price}원</h4>
      <div>
        <div>-</div>
        <div>{quantity}</div>
        <div>+</div>
      </div>
    </div>
  )
}
```

사용자가 더하기, 빼기 버튼을 클릭할때마다 해당 수량을 변경하는 코드를 추가해보면 아래와 같습니다.

```jsx
export default function ShoppingItem (props) {
  const {
    name,
    price
  } = props.item
  const [quantity, setQuantity] = useState(1)

  function changeQuantity(qty) {
    setQuantity(quantity + qty)
  }

  return (
    <div>
      <h3>{name}</h3>
      <h4>{price}원</h4>
      <div>
        <div onClick={() => changeQuantity(-1)}>-</div>
        <div>{quantity}</div>
        <div onClick={() => changeQuantity(1)}>+</div>
      </div>
    </div>
  )
}
```

수량을 조절하는 로직은 우리가 원하는대로 구성할 수 있습니다. 만약 0 이하의 수량은 허용하지 않고 싶다면 아래와 같이 작성할 수 있습니다.

```jsx
export default function ShoppingItem (props) {
  const {
    name,
    price
  } = props.item
  const [quantity, setQuantity] = useState(1)

  function changeQuantity(qty) {
    if (quantity <= 0) {
      return
    }

    setQuantity(quantity + qty)
  }

  return (
    <div>
      <h3>{name}</h3>
      <h4>{price}원</h4>
      <div>
        <div onClick={() => changeQuantity(-1)}>-</div>
        <div>{quantity}</div>
        <div onClick={() => changeQuantity(1)}>+</div>
      </div>
    </div>
  )
}
```

우리는 우리가 원하는 만큼 다양한 `state` 값을 만들어 사용할 수 있습니다. 아래 코드에서는 && 연산자를 이용하여 조건에 따라 보여주거나 숨겨주는 로직을 작성했습니다.

```jsx
export default function ShoppingItem (props) {
  const {
    name,
    price
  } = props.item
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  function changeQuantity(qty) {
    if (quantity <= 0) {
      setError('수량은 0 이상이어야 합니다.')
      return
    }

    setQuantity(quantity + qty)
  }

  return (
    <div>
      <h3>{name}</h3>
      <h4>{price}원</h4>
      <div>
        <div onClick={() => changeQuantity(-1)}>-</div>
        <div>{quantity}</div>
        <div onClick={() => changeQuantity(1)}>+</div>
      </div>
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}
```
