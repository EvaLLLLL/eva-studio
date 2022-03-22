---
title: 'React Hooks 使用方法'
date: '2020-11-08'
---

## 1. useState

- 使用状态

```javascript
const [n, setN] = React.useState(0)
const [user, setUser] = React.useState({ name: 'Eva' })
```

- 不可局部更新

如果 state 是一个对象，不能部分 setState，setState 会返回一个新对象，且 setState 不会帮我们自动合并属性。如下示例代码：

```jsx
function App() {
  const [user, setUser] = useState({ name: 'Liu', age: 18 })
  const onClick = () => {
    setUser({
      name: 'Eva',
    })
  }
  return (
    <div className="App">
      <h1>{user.name}</h1>
      <h2>{user.age}</h2>
      <button onClick={onClick}>Click</button>
    </div>
  )
}
```

- 地址要变，否则不更新

如果 setState 接收的对象地址不变，那么 React 就认为数据没有变化。

- 接受函数

useState 接受函数，此函数只在初始渲染时被调用：

```javascript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props)
  return initialState
})
```

setState 并不会改变原来的 n， 而是创造一个新的 n，如下代码，所以使用过程应中优先使用 setState(fn)：

```jsx
function App() {
  const [n, setN] = useState(0)
  const onClick = () => {
    setN(n + 1)
    setN(n + 1) // 会发现 n 不能加 2
    // setN(i=>i+1)
    // setN(i=>i+1) // 会发现 n 可以加 2
  }
  return (
    <div className="App">
      <h1>n: {n}</h1>

      <button onClick={onClick}>+2</button>
    </div>
  )
}
```

- 不能在 `useState` 里使用 `if`，或者说必须保证顺序一致

每次渲染时，useState 的调用顺序必须完全一致，原因为 React 为每一次的 useState 调用分配一个空间，通过 useState 调用顺序辨别各个空间。
React 不允许出现以下代码：

```javascript
const [n, setN] = React.useState(0)
let m, setM
if (n % 2 === 1) {
  ;[m, setM] = React.useState(0)
}
```

## 2. useEffect

- **在执行下一个 effect 之前，上一个 effect 就已被清除**
- **多个 useEffect 按顺序执行**
- **useEffect 是在渲染完后（afterRender）执行的**

```javascript
useEffect(fn, []) //只在第一次渲染之后执行 fn，模拟 componentDidMount
useEffect(fn, [count]) //只在 count 变化时执行 fn，模拟componentDidUpdate
useEffect(fn) // 出现变化就会执行 fn
useEffect(() => {
  console.log('渲染或变化了')
  return fn
}) // fn 模拟 componentWillUnmount
```

## 3. useLayoutEffect

- useLayoutEffect 是在渲染前执行
- useLayoutEffect 总是比 useEffect 先执行
- 故为了用户体验，优先使用 useEffect，也就是优先进行渲染

## 4. useContext

1. 定义：`context`  顾名思义是上下文的意思，举例来说 `全局变量`  是 `全局`  的**上下文**，**上下文**是局部的**全局变量**
1. 注意事项：useContext 不是响应式的，在一个模块将 C 里面的值变化，另一个模块不会感知到这个变化
1. 使用方法：

- 使用 `C = createContext(initial)`  创建上下文
- 使用 `<C.provider>`  圈定作用域
- 在作用域内使用 `useContext(C)`  来使用上下文

```jsx
const C = createContext(null)

function Yeye() {
  const [n, setN] = useState(0)
  return (
    <C.Provider value={{ n, setN }}>
      {' '}
      // 这里面的所有组件都可以使用 value 了<div className="Yeye">
        我是爷爷 我给出去的 n：{n}
        <Baba />
      </div>
    </C.Provider>
  )
}

function Baba() {
  const { n, setN } = useContext(C)
  return (
    <div>
      我是爸爸 n: {n} <Child />
    </div>
  )
}

function Child() {
  const { n, setN } = useContext(C)
  const onClick = () => {
    setN(i => i + 1)
  }
  return (
    <div>
      我是儿子 我得到的 n: {n}
      <button onClick={onClick}>+1</button>
    </div>
  )
}
```

## 5. useRef

1. 定义：使用 `useRef`。本质上，`useRef`  就像是可以在其  `.current`  属性中保存一个可变值的“盒子”
1. 使用：主要有如下两种使用方式
   - 需要一个在组件不断 render 时保持不变的值：

```javascript
const count = useRef(0) //初始化
count.current //读取

// render 后 count 还是那个 count
```

- DOM 引用

将 ref 对象以  `<div ref={myRef} />`  形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的  .current  属性设置为相应的 DOM 节点。

3. 注意事项：**变化时不会自动 render**

## 6. useReducer

复杂版 useState，使用方法如下：

1. 创建初始值 `initialState`
1. 创建所有操作 `reducer(state, action)`
1. 传给 `useReducer`，获得读写 API
1. 调用方法 `dispatch({type: 'decrement'})}`

```jsx
const initialState = { count: 0 }
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}
```

## 7. useMemo

useMemo 返回一个 memoized 值，把“创建”函数和依赖项数组作为参数传入  useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。 如果没有提供依赖项数组，`useMemo`  在每次渲染时都会计算新的值。

```jsx
useMemo(() => value, [m])
// 只有 m 变化的时候才会计算出新的 value
```

但是如果我的 value 是一个函数，就要写成：

```jsx
useMemo(() => m => console.log(m), [m]) // 一个返回函数的函数
```

这种写法看起来使人迷惑，于是就有了 `useCallback`，看下面 ↓

## 8. useCallback

useCallback 实际上就是 useMemo 的语法糖

```javascript
useCallback(m => console.log(m), [m])
// 上下等价
useMemo(() => m => console.log(m), [m])
```

## 9. useImperativeHandle

Modal.tsx

```tsx
type ModalRef = {
  show: () => void,
  hide: () => void
}

  type Props = {
    onSave: () => void
  }

    const RorwardModal = React.forwardRef<Ref, Props>(
    ({ onSave }, ref) => {
      const [visible, setVisible] = React.useState(false)
      const show = () => setVisible(true)
      const hide = () => setVisible(false)

      React.useImperativeHandle(ref, () => ({
        show,
        hide,
      }))

      return <Modal visible={visible} onCancel={hide}>forwarRef</Modal>
  }
```

ModalParent.tsx

```tsx
const Parent: React.FC = () = {
  const modalRef = React.useRef<ModalRef>(null)
  // now you can use modalRef.show & modalRef.hide
  
  return 
<>
  <Button onClick={() => modalRef.current?.show()}>show modal</Button>
  <RorwardMoral ref={modalRef} onSave={() => {}}/>
</>
}
```
