---
title: '试图理解 TypeScript 泛型'
date: '2021-02-16'
---

## 1. 为了解决什么问题

> 我们需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了类型变量，它是一种特殊的变量，只用于表示类型而不是值。

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```typescript
function identity(arg: any): any {
  return arg
}
```

为了使传入的类型与返回的类型是相同的，我们使用泛型来进行约束：

```typescript
function identity<T>(arg: T): T {
  return arg
}
```

## 2. 语法

定义单个类型参数

```typescript
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray<string>(3, 'x') // ['x', 'x', 'x']
```

也可以定义多个类型参数

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swap([7, 'seven']) // ['seven', 7]
```

## 3. 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length)
  return arg
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```

我们可以对泛型进行约束，只允许这个函数传入那些包含 `length`  属性的变量。这就是泛型约束：

```typescript
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

当然我们也可以如下实现不报错：

```typescript
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}
```

## 4. 泛型接口

本节介绍如何创建自定义泛型，像 Array<T>一样。

```typescript
interface GenericIdentityFn {
  <T>(arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn = identity
```

更进一步，可以把泛型参数当做整个接口的一个参数

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn<number> = identity
```

## 5. 泛型类

泛型类的做法与泛型接口差不多，如下：

```typescript
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}
```

使用：

```typescript
let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = ''
stringNumeric.add = function (x, y) {
  return x + y
}

console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))
```

## 6. 泛型参数的默认类型

当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
```
