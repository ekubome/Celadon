import { PostMeta } from "@/lib/posts";
import PostCardFeatured from "./PostCardFeatured";
import PostCardCompact from "./PostCardCompact";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return <PostCardFeatured post={post} />;
  }
  return <PostCardCompact post={post} />;
}
