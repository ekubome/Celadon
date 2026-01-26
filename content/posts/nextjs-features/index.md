---
title: "Next.js 15 新特性详解"
date: "2024-01-05"
category: "技术"
tags: ["Next.js", "React", "全栈开发"]
featured: false
excerpt: "深入了解 Next.js 15 带来的新特性，包括 Turbopack、Server Actions 增强、部分预渲染等。"
---

## Next.js 15 概览

Next.js 15 是一个重要的版本更新，带来了许多令人兴奋的新特性和性能改进。本文将详细介绍这些新特性及其使用方法。

## Turbopack 稳定版

Turbopack 现在已经稳定，可以在生产环境中使用：

```bash
# 使用 Turbopack 启动开发服务器
next dev --turbo
```

### 性能提升

- 本地服务器启动速度提升 76.7%
- 代码更新速度提升 96.3%
- 初始路由编译速度提升 45.8%

## Server Actions 增强

### 更简洁的语法

```tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')

  // 直接操作数据库
  await db.post.create({
    data: { title, content }
  })

  // 重新验证缓存
  revalidatePath('/posts')
}
```

### 在组件中使用

```tsx
// app/new-post/page.tsx
import { createPost } from './actions'

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="标题" />
      <textarea name="content" placeholder="内容" />
      <button type="submit">发布</button>
    </form>
  )
}
```

### useActionState Hook

```tsx
'use client'

import { useActionState } from 'react'
import { createPost } from './actions'

export function PostForm() {
  const [state, formAction, isPending] = useActionState(createPost, null)

  return (
    <form action={formAction}>
      <input name="title" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? '提交中...' : '发布'}
      </button>
      {state?.error && <p className="error">{state.error}</p>}
    </form>
  )
}
```

## 部分预渲染 (PPR)

部分预渲染允许在同一个页面中混合静态和动态内容：

```tsx
// app/page.tsx
import { Suspense } from 'react'

// 静态部分 - 构建时生成
function StaticHeader() {
  return <header>欢迎来到我的博客</header>
}

// 动态部分 - 请求时生成
async function DynamicPosts() {
  const posts = await fetchLatestPosts()
  return <PostList posts={posts} />
}

export default function HomePage() {
  return (
    <div>
      <StaticHeader />
      <Suspense fallback={<PostsSkeleton />}>
        <DynamicPosts />
      </Suspense>
    </div>
  )
}
```

### 启用 PPR

```javascript
// next.config.js
module.exports = {
  experimental: {
    ppr: true,
  },
}
```

## 改进的缓存策略

### 默认不缓存

Next.js 15 默认不再缓存 fetch 请求：

```tsx
// 默认不缓存
const data = await fetch('https://api.example.com/data')

// 显式启用缓存
const cachedData = await fetch('https://api.example.com/data', {
  cache: 'force-cache',
})

// 设置重新验证时间
const revalidatedData = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 },
})
```

### 路由缓存

```tsx
// 动态路由默认不缓存
export const dynamic = 'force-dynamic'

// 静态路由
export const dynamic = 'force-static'

// 设置重新验证时间
export const revalidate = 60
```

## React 19 支持

Next.js 15 完全支持 React 19 的新特性：

### use Hook

```tsx
import { use } from 'react'

function Comments({ commentsPromise }) {
  // 直接使用 Promise
  const comments = use(commentsPromise)

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.text}</li>
      ))}
    </ul>
  )
}
```

### 改进的 Suspense

```tsx
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

## 开发体验改进

### 更好的错误提示

- 更清晰的错误堆栈
- 源码映射改进
- 水合错误详细说明

### 热更新改进

```javascript
// 保持组件状态的热更新
if (module.hot) {
  module.hot.accept()
}
```

## 迁移指南

### 从 Next.js 14 迁移

1. 更新依赖：

```bash
pnpm add next@15 react@19 react-dom@19
```

2. 检查缓存策略：

```tsx
// 之前（默认缓存）
const data = await fetch(url)

// 之后（需要显式缓存）
const data = await fetch(url, { cache: 'force-cache' })
```

3. 更新 Server Actions：

```tsx
// 使用新的 useActionState
import { useActionState } from 'react'
```

## 总结

Next.js 15 带来了显著的性能提升和开发体验改进：

- **Turbopack** 让开发更快
- **Server Actions** 让全栈开发更简单
- **PPR** 让页面加载更智能
- **React 19** 支持让我们能使用最新特性

建议在新项目中直接使用 Next.js 15，现有项目可以按照迁移指南逐步升级。
