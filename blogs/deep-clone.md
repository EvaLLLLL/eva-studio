---
title: 'JavaScript deepClone'
date: '2020-08-27'
---

## 1. 序列化与反序列化

特点是依赖 JSON，所以只支持 `object` / `array` / `string` / `number` / `true` / `false` / `null` ，其他比如 `Function` / `undefined` / `Date`  等数据类型是不支持的。

```javascript
let num = 24;
let bool = true;
let obj = {
  id:1
  info:{
    name:"hello",
    age:24
  }
}

let num1 = JSON.parse(JSON.stringify(num))// num1是num的深拷贝
let bool1 = JSON.parse(JSON.stringify(bool))// num1是num的深拷贝
let obj2 = JSON.parse(JSON.stringify(obj))// 复杂数据类型也可以使用JSON.parse(JSON.stringify(obj))
```

## 2. 递归克隆

### 2.1 拷贝简单对象

简单对象指由简单数据类型组成的对象，不存在 `Array` / `Function` / `Date`  等子类型。

```javascript
function deepclone(target) {
  if (target instanceof Object) {
    let dist = {}
    for (let key in target) {
      dist[key] = deepclone(target[key])
    }
    return dist
  } else {
    return target
  }
}

let obj1 = {
  name: 'Eva',
  child: {
    name: 'Ellen',
  },
}
```

### 2.2 拷贝复杂对象 — 数组

实际上是在拷贝对象的方法中，加入对数组的兼容。

```javascript
function deepcloneArray(target) {
  if (target instanceof Object) {
    let dist
    target instanceof Array ? (dist = []) : (dist = {})
    for (let key in target) {
      dist[key] = deepcloneArray(target[key])
    }
    return dist
  } else {
    return target
  }
}
```

### 2.3 拷贝复杂对象 — 函数

函数的对象要符合深拷贝的逻辑：

1. 函数实现的功能相同 —— 返回值相同
1. 函数中的引用类型的属性不相同，简单类型的属性值相同

```javascript
function deepCloneFunc(target) {
  if (target instanceof Object) {
    let dist
    if (target instanceof Array) {
      dist = []
    } else if (target instanceof Function) {
      dist = function () {
        return target.call(this, ...arguments)
      }
    } else {
      dist = {}
    }
    for (let key in target) {
      dist[key] = deepCloneFunc(dist[key])
    }
    return dist
  } else {
    return target
  }
}
```

### 2.4 拷贝复杂对象 — 正则表达式

同上，增加正则表达式的兼容。

```javascript
function deepCloneFunc(target) {
  if (target instanceof Object) {
    let dist
    if (target instanceof Array) {
      dist = []
    } else if (target instanceof Function) {
      dist = function () {
        return target.call(this, ...arguments)
      }
    } else if (target instanceof RegExp) {
      dist = new RegExp(target.source, target.flags)
    } else {
      dist = {}
    }
    for (let key in target) {
      dist[key] = deepCloneFunc(dist[key])
    }
    return dist
  } else {
    return target
  }
}
```

### 2.5 拷贝复杂对象 — 日期

```javascript
function deepCloneFunc(target) {
  if (target instanceof Object) {
    let dist
    if (target instanceof Array) {
      dist = []
    } else if (target instanceof Function) {
      dist = function () {
        return target.call(this, ...arguments)
      }
    } else if (target instanceof RegExp) {
      dist = new RegExp(target.source, target.flags)
    } else if (target instanceof Date) {
      dist = new Date(target)
    } else {
      dist = {}
    }
    for (let key in target) {
      dist[key] = deepCloneFunc(dist[key])
    }
    return dist
  } else {
    return target
  }
}
```

## 3. 忽略原型属性

`for in`  会遍历包括原型上的所有可迭代的属性，事实上我们是不需要遍历原型上的属性的，因此我们使用 `hasOwnProperty`  来进行筛选优化。

```javascript
function deepCloneIgnoreProp(target) {
  if (target instanceof Object) {
    let dist
    if (target instanceof Array) {
      dist = []
    } else if (target instanceof Function) {
      dist = function () {
        return target.call(this, ...arguments)
      }
    } else if (target instanceof RegExp) {
      dist = new RegExp(target.source, target.flags)
    } else if (target instanceof Date) {
      dist = new Date(target)
    } else {
      dist = {}
    }
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        dist[key] = deepCloneIgnoreProp(dist[key])
      }
    }
    return dist
  } else {
    return target
  }
}
```

## 4. 防止环形引用爆栈

```javascript
function deepClone(target, cache = new Map()) {
  if (cache.get(target)) {
    return cache.get(target)
  }
  if (target instanceof Object) {
    let dist
    if (target instanceof Array) {
      dist = []
    } else if (target instanceof Function) {
      dist = function () {
        return target.call(this, ...arguments)
      }
    } else if (target instanceof RegExp) {
      dist = new RegExp(target.source, target.flags)
    } else if (target instanceof Date) {
      dist = new Date(target)
    } else {
      dist = {}
    }
    cache.set(target, dist)
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        dist[key] = deepClone(target[key])
      }
    }
    return dist
  } else {
    return target
  }
}
```
