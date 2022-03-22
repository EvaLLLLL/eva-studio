---
title: '[FixMe]JavaScript Notes'
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
**3.**`var`**声明的变量，可以在其声明语句前被使用，声明会被提升，但是赋值不会。**

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
空值合并运算符（nullish coalescing operator）的写法为两个问号 `??`，如果第一个参数不是 null/undefined，则 ?? 返回第一个参数。否则，返回第二个参数
```javascript
result = (a !== null && a !== undefined) ? a : b;
// 上下等同
result = a ?? b
```

# Object（对象）
## 基础
### 构造函数/字面量
```javascript
let user = new Object(); // “构造函数” 的语法
let user = {};  // “字面量” 的语法
```
```javascript
let user = {     // 一个对象
  name: "John",  // 键 "name"，值 "John"
  age: 30        // 键 "age"，值 30
};
```
### 计算属性
```javascript
let fruit = "apple"
let bag = {
  [fruit]: 5,
}
```
### 属性名称限制

- 不能是保留字
- 其他类型被作为对象属性的键时，会被转换成字符串
- `__proto__` 不能设置为一个非对象的值
```javascript
let obj = {};
obj.__proto__ = 5; // 分配一个数字
alert(obj.__proto__); // [object Object] — 值为对象，与预期结果不同
```
### 属性存在性测试，`in` 操作符

- 读取不存在的属性会得到 `undefined`
- 检查属性是否存在可以使用操作符 `in`，注意原本存储的就是 `undefined` 的时候，`in` 的判断仍然是正确的
```javascript
let user = { name: "John", age: 30 }
console.log("age" in user) // true
console.log("bala" in user) // false

let obj = { test: undefined }
console.log( obj.test ); // 显示 undefined，所以属性不存在？
console( "test" in obj ); // true，属性存在！
```
### `for...in...` 循环
```javascript
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // 属性键的值
  alert( user[key] ); // John, 30, true
}
```
### 对象的顺序
整数属性会被进行排序，其他属性则按照创建的顺序显示，“整数属性”指的是一个可以在不做任何更改的情况下与一个整数进行相互转换的字符串
```javascript
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

for(let code in codes) {
  alert(code); // 1, 41, 44, 49
}
```
为了解决电话号码的问题，需要给每个键名加一个加号 "+" 前缀，以达到根据创建时间排序的目的
```javascript
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```
## 对象引用和复制
与原始类型相比，对象的根本区别之一是对象是“通过引用”被存储和复制的，与原始类型值相反：字符串，数字，布尔值等 —— 始终是以“整体值”的形式被复制的。

**赋值了对象的变量存储的不是对象本身，而是该对象“在内存中的地址” —— 换句话说就是对该对象的“引用”。**

**当一个对象变量被复制 —— 引用被复制，而该对象自身并没有被复制。**
### 克隆和合并（浅拷贝）
```javascript
let user = {
  name: "John",
  age: 30
};

let clone = {}; // 新的空对象

// 将 user 中所有的属性拷贝到其中
for (let key in user) {
  clone[key] = user[key];
}

// 现在 clone 是带有相同内容的完全独立的对象
clone.name = "Pete"; // 改变了其中的数据

alert( user.name ); // 原来的对象中的 name 属性依然是 John
```
```javascript
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// 将 permissions1 和 permissions2 中的所有属性都拷贝到 user 中
Object.assign(user, permissions1, permissions2);

// 现在 user = { name: "John", canView: true, canEdit: true }
```
### 垃圾回收
[v8之旅：垃圾回收](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)
#### 什么样的值会被回收

1. “可达”值是那些以某种方式可访问或可用的值。它们一定是存储在内存中的。如果一个值可以通过引用或引用链从根访问任何其他值，则认为该值是可达的。
1. 几个对象相互引用，但外部没有对其任意对象的引用，这些对象也可能是不可达的，并被从内存中删除。
#### 怎么样回收
垃圾回收的基本算法被称为 “mark-and-sweep”。

- 垃圾收集器找到所有的根，并“标记”（记住）它们
- 然后它遍历并“标记”来自它们的所有引用
- 然后它遍历标记的对象并标记 **它们的** 引用。所有被遍历到的对象都会被记住，以免将来再次遍历到同一个对象
- ……如此操作，直到所有可达的（从根部）引用都被访问到
- 没有被标记的对象都会被删除
