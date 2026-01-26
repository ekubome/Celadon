import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const SITE_TITLE = "Celadon";
const SITE_DESCRIPTION = "一个简洁、优雅、独特的个人博客，分享技术与思考。";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: "zh-CN",
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${SITE_TITLE}. All rights reserved.`,
    author: {
      name: SITE_TITLE,
      link: SITE_URL,
    },
  });

  posts.slice(0, 20).forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.excerpt,
      content: post.content,
      date: new Date(post.date),
      category: [{ name: post.category }],
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
