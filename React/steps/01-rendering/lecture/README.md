# React Rendering

React의 대표적인 장점은 크게 두 가지입니다.

- 첫 번째로는, Declarative합니다.
- 두 번째로는, Composable합니다.

아래와 같이 간단하게 우리는 React를 시작할 수 있습니다.

```jsx
const element = <div>자, 여러분..</div>
const root = document.getElementById('root')

ReactDOM.render(element, root)
```

위 예제 코드에서 HTML처럼 생긴 부분은 JSX라고 부르는 문법입니다. Babel이라고 부르는 도구가 JSX 문법을 아래와 같이 Plain Javascript로 변환해주고, 우리는 변환한 결과물을 브라우저에서 실행시키게 됩니다.

```jsx
// without Babel
const element = React.createElement('div', null, '자, 여러분..')
const root = document.getElementById('root')

ReactDOM.render(element, root)
```

- `React.createElement` 함수의 첫 번째 인자는 DOM Element Type을 나타냅니다.
- 두 번째 인자는 Attribute를 나타냅니다. (React에서는 Element의 Attribute를 Props라고 부릅니다.)
- 나머지 인자는 Child Element입니다.

```jsx
const element = React.createElement('div', { className: 'something' }, 'hello')
const root = document.getElementById('root')

ReactDOM.render(element, root)
```

Child Element란, 단순 텍스트가 될 수도 있지만 또 다른 React Element가 될 수도 있습니다. 그리고 또한 여러 개의 Child를 가질 수도 있습니다.

```jsx
const element = React.createElement(
  'div',
  { className: 'something' },
  'hello',
  React.createElement('p', { style: { fontSize: '30px' } }, 'I am a paragraph')
)
const root = document.getElementById('root')

ReactDOM.render(element, root)
```

모든 것은 Javascript입니다. 그렇기에 우리는 변수를 사용할 수도 있습니다.

```jsx
const text = 'I am a paragraph'
const element = React.createElement(
  'div',
  { className: 'something' },
  'hello',
  React.createElement('p', { style: { fontSize: '30px' } }, text)
)

const root = document.getElementById('root')
ReactDOM.render(element, root)
```

위의 코드를 다시 JSX로 바꿔서 작성해보겠습니다. JSX에서 우리는 `{}`를 이용하여 `{}` 내부에 Javascript를 작성할 수 있습니다. `{}` 내부에는 Javascript Expression을 넣을 수 있습니다.

Javascript Expression이란 어떤 값으로 도출될 수 있는 코드 실행문을 의미합니다.

```jsx
const getText = () => 'I am a paragraph'
const element = (
  <div className="something">
    {' '}
    +<p style={{ fontSize: '30px' }}>{getText()}</p>
  </div>
)

const root = document.getElementById('root')
ReactDOM.render(element, root)
```

우리가 작성한 컴포넌트 내부에 다른 컴포넌트(`SomeComponent`)를 이용할 수도 있습니다.

```jsx
const getText = () => 'I am a paragraph'
const SomeComponent = () => (
  <p>I am something else.</p>
)
const element = (
  <div className="something">
    <SomeComponent />
    <p style={{ fontSize: '30px' }}>{getText()}</p>
  </div>
)

const root = document.getElementById('root')
ReactDOM.render(element, root)
```

위 `element` 또한 컴포넌트화 해본다면 아래와 같이 할 수 있습니다.

```jsx
const getText = () => 'I am a paragraph'
const SomeComponent = () => (
  <p>I am something else.</p>
)
const Article = () => (
  <div className="something">
    <SomeComponent />
    <p style={{ fontSize: '30px' }}>{getText()}</p>
  </div>
)

const root = document.getElementById('root')
ReactDOM.render(<Article />, root)
```

컴포넌트의 가장 큰 장점은 재사용성입니다. 앞으로 만들어 나갈 React Application의 중요한 초석이 되는 부분입니다. 현재 우리가 만든 `Article`이라는 컴포넌트는 항상 같은 UI를 보여주도록 되어있습니다만, React의 `props`를 이용하여 우리는 상황에 따라 다른 내용을 보여주도록 사용할 수 있습니다.

```jsx
const SomeComponent = () => (
  <p>I am something else.</p>
)
const Article = (props) => (
  <div className="something">
    <SomeComponent />
    <p style={{ fontSize: '30px' }}>{props.text}</p>
  </div>
)

const root = document.getElementById('root')
ReactDOM.render(<Article text="Who am I?" />, root)
```

React Element에게 Attribute을 주게 되면, 해당 컴포넌트 내부에서는 `props`를 이용하여 해당 정보를 사용할 수 있습니다. 우리는 우리가 원하는 만큼 다양하게 `props`를 줄 수 있습니다.

```jsx
const SomeComponent = (props) => (
  <p>{props.content}</p>
)
const Article = (props) => (
  <div className="something">
    <SomeComponent content={props.childText} />
    <p style={{ fontSize: '30px' }}>{props.text}</p>
  </div>
)

const root = document.getElementById('root')
ReactDOM.render(<Article text="Who am I?" childText="I am something else." />, root)
```

일반적으로는 최상단 Root Element 역할을 하는 `App` 컴포넌트를 만들고, 그 하위에 우리의 화면을 구성하는 Element들을 넣습니다. 또한 React에서 기본적으로 제공되는 `props.children`을 사용할 수도 있습니다.

```jsx
const SomeComponent = (props) => (
  <p>{props.content}</p>
)
const Article = (props) => (
  <div className="something">
    {props.children}
    <p style={{ fontSize: '30px' }}>{props.text}</p>
  </div>
)

function App() {
  const articleText = 'Who are you?'
  const childText = 'I am something else'

  return (
    <Article text={articleText} >
      <SomeComponent content={childText} />
    </Article>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
