---
title: '[WIP]JavaScript Notes'
date: '2022-03-10'
---

# 基础知识
## 变量&常量
### let & var
```javascript
// 变量
let user = 'John'
  , age = 25
  , message = 'Hello';
// 常量
const myBirthday = '18.04.1982';
```
### var
**1. **`var`** 声明的变量只有函数作用域和全局作用域，没有块级作用域** 

- 不是声明在函数内部，会被提升为全局变量
```javascript
if (true) {
  var test = true; // 使用 "var" 而不是 "let"
}

alert(test); // true，变量在 if 结束后仍存在
```

- 声明在函数内部，作用域为函数内部
```javascript
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // 能正常工作
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```
**2. **`var`** 允许重新声明**
```javascript
var user = "Pete";

var user = "John"; // 这个 "var" 无效（因为变量已经声明过了）
// ……不会触发错误

alert(user); // John
```
**3. **`var`** 声明的变量，可以在其声明语句前被使用，声明会被提升，但是赋值不会。**

例子：
```javascript
function sayHi() {
  alert(phrase);

  var phrase = "Hello";
}

sayHi();

// 实际 ⬇️
function sayHi() {
  var phrase; // 在函数刚开始时进行变量声明

  alert(phrase); // undefined

  phrase = "Hello"; // ……赋值 — 当程序执行到这一行时。
}

sayHi();
```

4. **IIFE（immediately-invoked function expressions，IIFE）**
```javascript
// 创建了一个函数表达式并立即调用。因此，代码立即执行并拥有了自己的私有变量
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```
## 数据类型
我们可以将任何类型的值存入变量。例如，一个变量可以在前一刻是个字符串，下一刻就存储一个数字，被称为“动态类型”（dynamically typed）
```javascript
// 没有错误
let message = "hello";
message = 123456;
```
```javascript
typeof undefined // "undefined"
typeof 0 // "number"
typeof 10n // "bigint"
typeof true // "boolean"
typeof "foo" // "string"
typeof Symbol("id") // "symbol"
typeof Math // "object"  (1)
typeof null // "object"  (2)
typeof alert // "function"  (3)
```
### Number
> _根据 ECMAScript 标准，JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值（-(2^53 -1) 到 2^53 -1），_**_它并没有为整数给出一种特定的类型_**_，特殊数值（special numeric values），Infinity、-Infinity 和 NaN 和属于 Number_

在 JavaScript 中，“number” 类型无法表示大于 (253-1)（即 9007199254740991），或小于 -(253-1) 的整数，可以使用 [Number.isSafeInteger()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) 检查是否在 [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) 和 [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) 之间
```javascript
alert( NaN + 1 ); // NaN
alert( 3 * NaN ); // NaN
alert( "not a number" / 2 - 1 ); // NaN
alrt(NaN ** 0) // 1
```
```javascript
42 / +0; // Infinity
42 / -0; // -Infinity
```
### BigInt
> [_BigInt_](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)_ 类型是 JavaScript 中的一个基础的数值类型，可以用任意精度表示整数_

BigInt 是通过在整数末尾附加 n 或调用构造函数来创建，BigInt不能与数字互换操作
```javascript
// 尾部的 "n" 表示这是一个 BigInt 类型
const bigInt = 1234567890123456789012345678901234567890n;

const x = 2n ** 53n;
// 9007199254740992n
const y = x + 1n;
// 9007199254740993n
```
### String
单、双、反引号都支持
```javascript
"hello"
'hello'
const name = "John"
`hello ${name}`
```
### Boolean
true / false
### "null"
`JavaScript` 中的 `null` 仅仅是一个代表“无”、“空”或“值未知”的特殊值
### "undefined"
`undefined` 的含义是 `未被赋值`
### Object
其他所有的数据类型都被称为“原始类型”，因为它们的值只包含一个单独的内容（字符串、数字或者其他）。相反，`object` 则用于储存数据集合和更复杂的实体。
### Symbol
`symbol` 类型用于创建对象的唯一标识符
## 类型转换
```javascript
// => string
let value = true;
alert(typeof value); // boolean
value = String(value); // 现在，值是一个字符串形式的 "true"
alert(typeof value); // string

// => number
Number("   123   "); // 123
Number("123z");      // NaN（从字符串“读取”数字，读到 "z" 时出现错误）
Number(true);        // 1
Number(false);       // 0

// => boolean 只有下列值是 falsy
Bolean("") // false
Bolean(null) // false
Bolean(undefined) // false
Bolean(NaN) // false
Bolean(0) // false
```
## 基础运算
TODO
## 条件分支
TODO
## 逻辑运算
```javascript
// 或，寻找第一个真值
result = a || b
// 与，寻找第一个假值
result = a && b
// 非
result = !a
```
## 空值合并 '??'
空值合并运算符（nullish coalescing operator）的写法为两个问号 `??`
```javascript
result = (a !== null && a !== undefined) ? a : b;
result = a ?? b
```





