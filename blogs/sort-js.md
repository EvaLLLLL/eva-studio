---
title: '排序算法 JavaScript 版'
date: '2020-08-02'
---

## 1. 快速排序

```javascript
const quickSort = array => {
  if (array.length <= 1) {
    return array
  }

  let pivotIndex = Math.floor(array.length / 2)
  let pivot = array.splice(pivotIndex, 1)[0]
  let left = []
  let right = []

  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }

  return quickSort(left).concat([pivot], quickSort(right))
}

let array = [2, 1, 5, 2, 8, 4, 9, 5]
console.log(quickSort(array))
```

## 2. 计数排序

```javascript
const countSort = array => {
  let result = []
  let max = 0
  let map = new Map()

  for (let i = 0; i < array.length; i++) {
    if (!(array[i] in map)) {
      map[array[i]] = 1
    } else {
      map[array[i]] += 1
    }
    if (array[i] > max) {
      max = array[i]
    }
  }

  for (let j = 0; j <= max; j++) {
    if (j in map) {
      for (let h = 1; h <= map[j]; h++) {
        result.push(j)
      }
    }
  }

  return result
}

let array = [2, 1, 5, 2, 8, 4, 9, 5]
console.log(countSort(array))
```

## 3. 选择排序

```javascript
let min = numbers => {
  if (numbers.length > 2) {
    return min([numbers[0], min(numbers.slice(1))])
  } else {
    return numbers[0] < numbers[1] ? numbers[0] : numbers[1]
  }
}

let minIndex = numbers => {
  return numbers.indexOf(min(numbers))
}

const selectionSort = array => {
  if (array.length > 2) {
    let index = minIndex(array)
    let min = array[index]
    array.splice(index, 1)
    return [min].concat(selectionSort(array))
  } else {
    return array[0] < array[1] ? array : array.reverse()
  }
}

let array = [2, 1, 5, 2, 8, 4, 9, 5]
console.log(selectionSort(array))
```

## 4. 归并排序

```javascript
const mergeSort = array => {
  if (array.length === 1) {
    return array
  }

  let left = array.slice(0, Math.floor(array.length / 2))
  let right = array.slice(Math.floor(array.length / 2))

  return merge(mergeSort(left), mergeSort(right))
}

const merge = (a, b) => {
  if (a.length === 0) return b
  if (b.length === 0) return a

  return a[0] > b[0]
    ? [b[0]].concat(merge(a, b.slice(1)))
    : [a[0]].concat(merge(a.slice(1), b))
}

let array = [2, 1, 5, 2, 8, 4, 9, 5]
console.log(mergeSort(array))
```

## 5. 冒泡排序

```javascript
const bubbleSort = array => {
  let sortNum = array.length - 1
  for (let i = sortNum; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}

let array = [2, 1, 5, 2, 8, 4, 9, 5]
console.log(bubbleSort(array))
```

## 6. 插入排序

```javascript
const swap = (array, i, j) => {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

const insertSort = array => {
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      if (array[j] < array[j - 1]) {
        swap(array, j, j - 1)
      } else {
        break
      }
    }
  }
  return array
}

let array = [2, 1, 5, 2, 8, 4, 9, 5]
console.log(insertSort(array))
```

## 复杂度

![image.png](https://tva1.sinaimg.cn/large/e6c9d24ely1h0j93sriclj215w0rswif.jpg)
