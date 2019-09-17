# CSS Secret

#### 책 내용 중에 실제로 쓸만한 것들을 모아둔 폴더

> Array-Like Object(DOM)를 배열로
 
```javascript
function $$(selector, context = document) {
  const elements = context.querySelectorAll(selector);
  return [...elements];
}
```
