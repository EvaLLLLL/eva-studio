---
title: '搜索框完全受控防抖造成中文输入中断解决方案'
date: '2022-02-02'
---

### 问题

`input` 完全受控防抖会造成中文输入中断解决方案

```tsx
<Input
  value={value}
  onInput={e => {
  	const v = e.target.value?.trim() || ''
    if (debouncedOnChange) debouncedOnChange(v)
  }}
/>
```

### 解决方法

内部维护 `innerValue`仅用于输入框信息展示

```tsx
// 仅用于展示 input 输入值
const [innerValue, setInnerValue] = React.useState(value)

return (
  <Input
    value={innerValue}
    onInput={e => {
      setInnerValue(e.target.value)
  		const v = e.target.value?.trim() || ''
    	if (debouncedOnChange) debouncedOnChange(v)
  }}
  />
)
```
