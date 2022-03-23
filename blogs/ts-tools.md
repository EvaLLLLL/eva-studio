---
title: 'TypeScript 工具类型'
date: '2021-01-15'
---

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Exclude<T, U> = T extends U ? never : T

type Extract<T, U> = T extends U ? T : never

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any
```
