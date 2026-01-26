import { getRecentPosts } from "@/lib/posts";
import { RecentPostsClient } from "./RecentPostsClient";

export function RecentPosts() {
  const posts = getRecentPosts(6);
  return <RecentPostsClient posts={posts} />;
}
