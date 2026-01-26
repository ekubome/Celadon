---
title: "前端性能优化实战指南"
date: "2024-01-10"
category: "技术"
tags: ["性能优化", "前端", "Web Vitals"]
featured: true
excerpt: "深入探讨前端性能优化的各种技术手段，从加载性能到运行时性能的全面优化策略。"
---

## 为什么性能很重要

网站性能直接影响用户体验和业务指标：

- **用户体验**：页面加载每延迟 1 秒，用户满意度下降 16%
- **转化率**：加载时间超过 3 秒，53% 的移动用户会离开
- **SEO 排名**：Google 将页面速度作为排名因素之一

## Core Web Vitals

Google 定义的三个核心指标：

### LCP (Largest Contentful Paint)

最大内容绘制时间，衡量加载性能。目标：< 2.5 秒

优化策略：
- 优化服务器响应时间
- 使用 CDN
- 预加载关键资源
- 优化图片

### FID (First Input Delay)

首次输入延迟，衡量交互性。目标：< 100 毫秒

优化策略：
- 减少 JavaScript 执行时间
- 代码分割
- 使用 Web Workers

### CLS (Cumulative Layout Shift)

累积布局偏移，衡量视觉稳定性。目标：< 0.1

优化策略：
- 为图片和视频预留空间
- 避免在现有内容上方插入内容
- 使用 transform 动画

## 加载性能优化

### 资源优化

```javascript
// 图片懒加载
<img loading="lazy" src="image.jpg" alt="描述" />

// 预加载关键资源
<link rel="preload" href="critical.css" as="style" />
<link rel="preload" href="hero.jpg" as="image" />

// 预连接第三方域名
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

### 代码分割

```typescript
// Next.js 动态导入
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
})
```

### 图片优化

```tsx
// 使用 Next.js Image 组件
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // 关键图片优先加载
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

## 运行时性能优化

### React 性能优化

```tsx
// 使用 useMemo 缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// 使用 useCallback 缓存函数
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

// 使用 React.memo 避免不必要的重渲染
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>
})
```

### 虚拟列表

处理大量数据时使用虚拟列表：

```tsx
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }) {
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  })

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: virtualItem.start,
              height: virtualItem.size,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 网络优化

### HTTP/2 和 HTTP/3

- 多路复用
- 头部压缩
- 服务器推送

### 缓存策略

```javascript
// Service Worker 缓存
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
```

## 性能监控

### 使用 Performance API

```javascript
// 测量关键操作耗时
performance.mark('start')
// ... 执行操作
performance.mark('end')
performance.measure('操作耗时', 'start', 'end')

const measures = performance.getEntriesByType('measure')
console.log(measures[0].duration)
```

### 真实用户监控 (RUM)

```javascript
// 上报 Web Vitals
import { getCLS, getFID, getLCP } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getLCP(console.log)
```

## 总结

性能优化是一个持续的过程，需要：

1. **建立基准**：使用 Lighthouse、WebPageTest 等工具测量当前性能
2. **设定目标**：根据业务需求设定合理的性能指标
3. **持续监控**：部署 RUM 监控，及时发现性能退化
4. **迭代优化**：根据数据驱动的方式持续改进

记住：过早优化是万恶之源，但性能问题也不应该被忽视。找到平衡点，在正确的时机做正确的优化。
