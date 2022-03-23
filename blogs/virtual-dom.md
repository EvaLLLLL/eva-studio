---
title: '[Pinned]虚拟 DOM & DOM diff'
date: '2020-10-16'
---

## 1. 虚拟 DOM

### 1.1 定义

> DOM 树的信息都可以用 JavaScript 对象来表示，反过来，你就可以根据这个用 JavaScript 对象表示的树结构来构建一棵真正的 DOM 树

一个能代表 DOM 树的对象，通常含有标签名、标签上的属性、时间监听和子元素们，以及其他属性

### 1.2 Vue&React 中的虚拟 DOM

Vue 和 React 中的虚拟 DOM，实际就是一个对象，如下代码

- Vue

```javascript
const vNode = {
  tag: "div", // 标签名 or 组件名
  data: {
    class: "red", // 标签上的属性
    on: {
      click: () => {} // 事件
    }
  },
  children: [ // 子元素们
    { tag: "span", ... },
    { tag: "span", ... }
  ],
  ...
}
```

- React

```javascript
const vNode = {
  key: null,
  props: {
    children: [  // 子元素们
       { type: 'span', ... },
       { type: 'span', ... }
    ],
    className: "red" // 标签上的属性
    onClick: () => {} // 事件
  },
  ref: null,
  type: "div", // 标签名 or 组件名
  ...
}
```

### 1.3 VUE&React 创建虚拟 DOM

- Vue（只能在 render 函数里得到 h）

```javascript
h('div', {
  class: 'red',
  on: {
    click: () => { }
  },
}, [h('span',{},'span1'), h('span', {}, 'span2'])
```

为了简化写法，Vue 提供了 template 模板语法，通过 Vue-loader 转化成 h 形式，如下

```vue
<div class="red" @click="fn">
  <span>span1</span>
  <span>span2</span>
</div>
```

- React（React.createElement）

```javascript
createElement('div', { className: 'red', onClick: () => {} }, [
  createElement('span', {}, 'span1'),
  createElement('span', {}, 'span2'),
])
```

为了简化写法，React 可使用 JSX 形式，使用 babel 转化成 createElement 形式，如下

```jsx
<div className="red" onClick={fn}>
  <span>span1</span>
  <span>span2</span>
</div>
```

### 1.4 虚拟 DOM 的优缺点

- 优点

1、减少 DOM 操作次数/频率：虚拟 DOM 可以讲多次真实的 DOM 操作合并为一次操作。例如添加 1000 个节点，真实 DOM 是一个接一个操作的；
2、减少 DOM 操作范围：虚拟 DOM 借助 DOM diff 可以把多余的操作省掉，比如添加 1000 个节点，其实只有 10 个是新增的，那么虚拟 DOM 便可以减少 DOM 的操作范围
3、可跨平台操作：由于虚拟 DOM 本质上只是一个 JS 对象，所以虚拟 DOM 不仅可以变成 DOM，还可以变成小程序、IOS 应用、安卓应用。

- 缺点

1、需要额外的创建函数：比如 React 中的 createElement、Vue 中的 h 函数，目前的解决方案是通过 JSX/template 模板语法来简化成 XML 写法
2、严重依赖打包工具，需要添加额外的构建过程

## 2. DOM diff

**DOM diff 是虚拟 DOM 的对比算法**
\*\*
**以 React 的 DOM diff 为例，React 分别对 tree diff、component diff 以及 element diff 进行算法优化**

### 2.1 tree diff

React 对树进行分层比较，两棵树只会对同一层次的节点进行比较
![image.png](https://tva1.sinaimg.cn/large/e6c9d24ely1h0j8h29inyj20h4087t9j.jpg)

### 2.2 component diff

React 对组件进行比较，如果是同一类型的组件，按照原策略继续比较 virtual DOM tree；
如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。

如下图，如果 D 和 G 是不同的组件，那么删 D，重新构建 G 以及其子节点
![image.png](https://tva1.sinaimg.cn/large/e6c9d24ely1h0j8i5g6ltj20hu07qgm3.jpg)

###

### 2.3 element diff

当节点处于同一层级的时候，React diff 提供了三种节点操作，分别为：**INSERT_MARKUP（插入）**、**MOVE_EXISTING（移动）**和  **REMOVE_NODE（删除）**。

- **INSERT_MARKUP**，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。

- **MOVE_EXISTING**，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。

- **REMOVE_NODE**，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

## 3. DOM diff 中的 key

DOM diff 在某些情况会出现识别错误，如下代码

```vue
<template>
  <div id="app">
    <Child v-for="(item, i) in array" :text="item" @delete="remove(i)" />
  </div>
</template>

<script>
import Child from './components/Child'

export default {
  name: 'App',
  components: {
    Child,
  },
  data() {
    return {
      array: [1, 2, 3],
    }
  },
  methods: {
    remove(i) {
      this.array.splice(i, 1)
    },
  },
}
</script>
```

![image.png](https://tva1.sinaimg.cn/large/e6c9d24ely1h0j8ilcyz4j20jy04ddfy.jpg)
会出现这种情况的原因是：

```vue
旧 array[1, 2, 3] 新 array[1, 2]
```

我们在执行操作的时候，只对数组进行了操作，即每一条 Child，而并没有对 Child 的子元素进行操作。而数组的对比是由遍历来的，所以大概的过程就成了下图这样，也就形成了上图的结果
![image.png](https://tva1.sinaimg.cn/large/e6c9d24ely1h0j8ivndegj20p10bd0ts.jpg)
为了避免这种情况的出现了，React 和 VUE 允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，出现了下面这种情况，这次就对了
![image.png](https://tva1.sinaimg.cn/large/e6c9d24ely1h0j8j07akqj20y90mbwgr.jpg)
总之 index 和 key 都可以用作逻辑上来判断是否相同节点，但是用 index 做 key 在上述情况下会出现一些误差，所以最好要加上`:key`  绑定。
