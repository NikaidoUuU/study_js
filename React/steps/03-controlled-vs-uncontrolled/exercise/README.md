# Controlled vs Uncontrolled

## 결제 정보 자동 완성하기

1. 사용자가 "배송 정보와 동일"을 체크할 경우, 결제 정보 입력칸에 배송 정보와 동일한 정보가 자동으로 입력되도록 작업해주세요.
2. 사용자가 "배송 정보와 동일"의 체크를 해지할 경우, 결제 정보 입력칸의 정보가 모두 초기화 되도록 작업해주세요.
3. 사용자가 "제출"을 클릭할 경우, `props`로 받은 `onSubmit` 함수에 사용자의 배송 및 결제 정보를 아래와 같은 형식으로 전달해주세요.

```js
{
  billing: {
    name: "something",
    address: "something"
  },
  shipping: {
    name: "something",
    address: "something"
  }
}
```
