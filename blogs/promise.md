---
title: '试图理解 Promise'
date: '2020-08-11'
---

### 1. 为什么要使用 Promise

- 规范回调的名字或顺序
- 避免回调地狱，使得代码可读性强
- 很方便的捕获错误

下面以 AJAX 封装为例，首先定义一个 ajax：

```javascript
const ajax = (method, url, options) => {
  const { success, fail } = options
  request.open(method, url)
  request.onreadystateChange = () => {
    if (request.status < 400) {
      success(request.response)
    } else if (request.status >= 400) {
      fail(request, request.status)
    }
  }
  request.send()
}
```

会这样子使用这个 AJAX：

```javascript
ajax('get', '/xxx', {
  success(response) {
    console.log(response)
  },
  fail(request) {
    console.log(request)
  },
})
```

接下来把上面的代码改成 Promise 写法：

```javascript
const ajax = (method, url, options) {
	return new Promise((resolve, reject)=>{
  	const {success, fail} = options
  	request.open(method, url)
  	request.onreadystateChange = () => {
  	if (request.status < 400) {
    	resolve(request.response)
    } else if (request.status >= 400) {
    	resolve(request)
    }
  }
  request.send()
  })
}
```

这样使用的时候就可以使用链式操作了：

```javascript
ajax('get', '/xxx').then(
  response => {},
  request => {},
)
```

### 2. Promise 的状态

- _pending_：初始状态，等待操作
- _fulfilled_：操作成功完成
- _rejected_：操作失败

### 3. Promise 链式调用

- `promise.then()`
- `promise.catch()`
- `promise.finally()`

### 4.静态方法

- `Promise.all(iterable)` ：一旦 iterable 里面的 promise 对象失效则立即出发该 promise 对象的失败，也就是所有的 promise 都成功才成功
- `Promise.allSettled(iterable)` ： iterable 里面的 promise 对象都已经成功或失败后完成，返回每个对象的 promise 结果数组
- `Promise.any(iterable)`  : 一旦 iterable 里面的 promise 对象中的其中一个成功，返回那个成功的 promise 的值
- `Promise.race(iterable)` ：当 iterable 参数里的任意一个子 promise 被成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应句柄，并返回该 promise 对象

### 5. aync&await

`async` 和 `await` 使用更简洁的方式写出基于 `Promise` 的行为。设计初衷能让异步函数看起来更像标准的同步函数，更加直观易读。
改写之前的 AJAX 使用代码：

```javascript
aync foo() {
	try {
  	let response = await ajax('get', '/xxx')
    console.log(response)
  } catch (error) {
  	console.log(error)
  }
}

foo()
```
