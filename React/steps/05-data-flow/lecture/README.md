# Data Flow in React Applications

```js
// Component Tree Structure
  App -> ProductList -> ProductItem -> Quantity
//
```

위와 같은 구조의 컴포넌트들이 구성되어 있습니다. `<Quantity />` 컴포넌트는 각 제품의 주문 수량을 내부 state로 관리하고 있습니다. 그리고 우리는 이 정보를 상위 컴포넌트에 전달해야 하는 상황입니다. 하위 컴포넌트에서 관리하는 state값을 어떻게 하면 상위 컴포넌트에서 접근하여 사용할 수 있을지 살펴보도록 하겠습니다. 우리가 구현해야 할 기능은 아래와 같습니다.

- 메인 페이지에서 "장바구니(3)"과 같이 장바구니에 담은 상품의 수량을 보여주는 기능
- 장바구니가 비었을 경우에는 메인 페이지에서 주문 페이지로 이동하는 "장바구니" 버튼이 보이지 않게 하는 기능

## Lifting States Up

```js
//                                        ▽ 현재 State 위치
  App -> ProductList -> ProductItem -> Quantity
//                           △ 1차적으로 State 값이 필요한 곳
//
  App -> ProductList -> ProductItem -> Quantity
// △ 최종적으로 State 값이 필요한 곳
```

**생각해볼 점:** *controlled vs uncontrolled component*

현재 `<Quantity />` 컴포넌트 내부에서 `quantity` 정보를 관리하고 있으나 해당 state 값의 관리를 한 단계 상위 컴포넌트에서 관리하게 된다면, 우리가 원하는 것처럼 상위 컴포넌트(`<ProductItem />`)에서 state 값을 사용할 수 있습니다.

```js
function ProductItem({ productId, name, price, imagePath, addToCart }) {
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

            addToCart(productId, name, price, quantity)
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
```

`<ProductItem />` 컴포넌트를 위와 같이 수정함에 따라 더 이상 `<Quantity />` 컴포넌트에서는 `quantity` state를 관리할 필요가 없어졌습니다. `<Quantity />` 컴포넌트는 controlled component 형식으로 변경되어 재사용이 더욱 용이해졌고, 상위 컴포넌트로 state 값의 위치를 옮겨오는 것에 성공했습니다. 이런 방식으로 우리는 한 단계 더 state 값을 올릴 수 있습니다.

## Lift State Again

이제 같은 방식으로 `quantity` state 값을 두 단계 더 올려 `<App />` 컴포넌트 내부에서 "장바구니(3)" 기능을 추가해야 합니다. 우리는 장바구니에 추가한 상품의 정보를 보여주어야 하므로, 가변적인 장바구니 정보를 `<App />` 컴포넌트 내부 state 배열로 만들어 관리하도록 하겠습니다. 장바구니 정보에는 수량 뿐 아니라 금액이나 상품명도 함께 추가하도록 해야 합니다. 그래야 장바구니 페이지에서 사용자에게 보여줄 수 있기 때문입니다. 장바구니 관련 state는 App 컴포넌트에 만들어 놓았고 관련 함수 또한 함께 추가해놓았습니다. 나머지는 여러분이 `./exercise` 디렉토리 내에서 작업해보세요.
