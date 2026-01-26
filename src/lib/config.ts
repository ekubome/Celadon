export const siteConfig = {
  name: 'Celadon',
  description: '专注于创造简约优雅的数字体验，用设计和代码构建有温度的产品。',
  url: 'https://wkubo.me', // Update this with your actual domain
  author: {
    name: 'ekubo',
    email: 'ekubome@163.com',
    bio: '一个热爱技术与设计的开发者，专注于创造简约优雅的数字体验。',
    avatar: '/images/avatar.jpg',
  },
  links: {
    github: '#',
    twitter: '#',
    linkedin: '#',
  },
  // Giscus comment system configuration
  // To set up: https://giscus.app/
  comments: {
    enabled: true,
    provider: 'giscus' as const,
    giscus: {
      repo: 'your-username/your-repo', // Replace with your GitHub repo
      repoId: '', // Get from https://giscus.app/
      category: 'Announcements',
      categoryId: '', // Get from https://giscus.app/
      mapping: 'pathname' as const,
      reactionsEnabled: true,
      emitMetadata: false,
      inputPosition: 'top' as const,
      theme: 'light',
      darkTheme: 'dark',
      lang: 'zh-CN',
    },
  },
  // Theme configuration
  theme: {
    defaultTheme: 'system' as const, // 'light' | 'dark' | 'system'
    storageKey: 'celadon-theme',
  },
};

// Internationalization strings
export const i18n = {
  blog: {
    readMore: '阅读更多',
    minRead: '分钟',
    featured: '精选',
    relatedPosts: '相关文章',
    backToBlog: '返回博客',
    noPosts: '暂无文章',
    totalPosts: (count: number) => `共 ${count} 篇文章`,
    totalTags: (count: number) => `共 ${count} 个标签`,
  },
  archive: {
    label: '归档',
    title: '文章归档',
    description: '按时间线浏览所有文章',
    postsInYear: (count: number) => `${count} 篇`,
  },
  tags: {
    label: '标签',
    title: '标签云',
    description: '按标签浏览所有文章',
    allTags: '所有标签',
  },
  category: {
    label: '分类',
  },
  series: {
    label: '系列文章',
    title: '系列文章',
    description: '按系列浏览文章，系统性学习相关主题。',
    noSeries: '暂无系列文章',
    browseAll: '浏览所有文章',
    postsCount: (count: number) => `${count} 篇文章`,
    moreCount: (count: number) => `还有 ${count} 篇...`,
  },
  months: [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月',
  ],
};

export type SiteConfig = typeof siteConfig;
export type I18n = typeof i18n;
