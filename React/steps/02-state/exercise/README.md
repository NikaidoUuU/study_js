# State

## "배송 정보와 동일" 기능 완성하기

1. `CheckoutForm.js` 파일을 열어보세요.
2. `"배송 정보와 동일"` 버튼을 체크했을때 결제 정보 입력 칸이 보이지 않도록 해주세요.
3. `"배송 정보와 동일"` 버튼의 체크를 해제했을때 결제 정보 입력 칸이 보이도록 해주세요.
4. 폼이 제출되었을때, `onSubmit` 함수를 호출하고 인자로 다음과 같은 형식의 데이터를 넘겨주세요.

```json
{
  "billing": {
    "name": "USER_NAME",
    "address": "ADDRESS"
  },
  "shipping: {
    "name": "USER_NAME",
    "address": "ADDRESS"
  }
}
```