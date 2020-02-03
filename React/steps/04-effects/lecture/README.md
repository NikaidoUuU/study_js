# Side Effects

"Side Effect"란, 부작용이라는 뜻의 단어입니다. 프로그래밍에서의 Side Effect란, 어떤 함수가 함수 외부의 정보와 영향을 주고 받는 일을 일컫습니다. Side Effect가 없는 함수는 보통 Pure Function(순수 함수)입니다.

React에서 Function Component의 임무는 단 한가지입니다. UI를 그려주는 것입니다. 하지만 때로는 UI에 그려줄 데이터를 외부에서 가져와야 할 수도 있습니다. 예를 들면, 서버로 요청을 보내고 그에 따른 응답을 받아서 UI에 보여주어야 하는 경우입니다. 이와 같은 상황에서 서버와 교류하는 네트워크 요청은 React Component 함수 입장에서는 Side Effect라고 할 수 있습니다. 이 외에도 굉장히 많은 종류의 Side Effect가 있을 수 있습니다.

## 컴포넌트 외부 정보 구독하기

요즘 수많은 웹사이트들은 반응형으로 구축되어 만들어집니다. 그리고 Media Query를 이용하여 손쉽게 특정 UI를 숨기거나 보여줄 수 있습니다. 그렇지만 만약에 서버로 요청을 보내야 하는 컴포넌트가 있다고 가정한다면, Media Query는 해당 UI를 화면에서 숨겨주는 역할을 할 수 있을뿐 서버로 요청이 나가는 부분까지 생략하도록 할 수는 없습니다. 그렇기 때문에, 때로는 Media Query가 아닌 자바스크립트를 이용하여 이 문제를 해결하는 것이 나은 방법일 수 있습니다. 자바스크립트를 이용한다면, 우리는 우리가 원하는 컴포넌트를 상황에 따라 실제로 사용되지 않도록 방지할 수 있습니다.

```js
function CustomHeader() {
  const media = window.matchMedia('(min-width: 800px)')
  const isWide = media.matches

  // ..
}
```

위 코드 예제에서 Side Effect가 발생하고 있습니다. 컴포넌트 입장에서는 외부 정보인 브라우저 화면 사이즈 정보를 토대로 작업을 하고 있기 때문입니다. 그리고 이 Side Effect는 `CustomHeader`가 (굳이 필요하지 않은 상황이 있을 수 있음에도 불구하고) 매번 다시 렌더링될때마다 실행됩니다. 다시 렌더링되는 과정은 부모 컴포넌트가 `CustomHeader` 컴포넌트를 다시 렌더링 시키거나, 다른 `state` 값이 변했을때 발생할 수 있습니다. 하지만 `CustomHeader` 컴포넌트는 브라우저 사이즈가 변함에 따라 다시 렌더링되지는 않습니다. 브라우저 사이즈 변화에 대해 구독하고 다시 `CustomHeader` 컴포넌트를 렌더링하는 로직(구독)이 없기 때문입니다.

```js
function CustomHeader() {
  const media = window.matchMedia('(min-width: 800px)')

  // 구독하기
  const media.addListener(() => {
    console.log(media.matches)
    // ..
  })

  const isWide = media.matches

  // ...
}
```

위 코드처럼 수정했을때, 여전히 Side Effect는 `CustomHeader` 컴포넌트가 다시 렌더링될때마다 실행되기는 하지만, 적어도 우리는 브라우저의 사이즈 변화에 대해 구독하고 있습니다. 새로운 사이즈 변화에 대한 정보를 우리는 어떻게 저장해야 할까요? 또한 매번 `CustomHeader` 컴포넌트가 다시 렌더링되는 과정에서 계속 쌓이는 구독 신청은 어떻게 처리해야 할까요?

```js
function ProductsSidebar() {
  const query = '(min-width: 800px)'
  const initialScreenState = window.matchMedia(query).matches
  const [isWide, setIsWide] = useState(initialScreenState)

  useEffect(() => {
    const media = window.matchMedia(query)
    media.addListener(() => {
      setIsWide(media.matches)
    })
  }, [])

  // ...
}
```

위와 같이 수정함으로 해서 우리는 세 가지를 얻었습니다.

1. Side Effect는 컴포넌트가 다시 렌더링되는 과정에서 매번 실행되지 않습니다.
2. 구독 신청이 한번만 실행됩니다.
3. `isWide`라는 정보를 관리할 수 있게 되었습니다.

하지만 여전히 문제가 하나 남았습니다. 매번 `CustomHeader` 컴포넌트가 unmount -> re-mount 되는 과정에서 우리는 listener를 메모리 상에 낭비하게 됩니다. `addListener`를 실행했다면 `removeListener`를 이용하여 뒷정리를 해주어야 하는데, 새롭게 마운트되는 과정에서 새로운 listener를 등록만 할뿐, unmount되는 과정에서 뒷정리를 하지는 않고 있습니다.

```js
useEffect(() => {
  const media = window.matchMedia(query)
  const listener = () => setIsWide(media.matches)

  media.addListener(listener)

  return function () {
    media.removeListener(listener)
  }
}, [isWide]) // useEffect now runs when `isWide` changes
```
