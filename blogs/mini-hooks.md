---
title: '[FixMe]手写 Hooks'
date: '2021-04-11'
---

### 1. useState

```tsx
type Dispatch<T> = (val: T) => void

let index = -1
let _states: any[] = []

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

function useState<T>(initialState: T): [T, Dispatch<T>] {
  index++
  const currentIndex = index
  _states[currentIndex] =
    _states[currentIndex] === undefined ? initialState : _states[currentIndex]
  const setState: (val: T) => void = (newState: T) => {
    _states[currentIndex] = newState
    render()
    index = -1
  }

  return [_states[currentIndex], setState]
}
```

### 2. useEffect

```ts
let prevDeps: any[] = []
let effectedCount = 0
function useEffect(callback: Function, depsArr: any[]) {
  const changed = depsArr.some((d, index) => d !== prevDeps[index])
  if (changed) callback()
  prevDeps = depsArr
}
```
