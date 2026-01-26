import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { RecentPosts } from "@/components/sections/RecentPosts";

export default function Home() {
  return (
    <>
      <Hero />
      <RecentPosts />
      <AboutPreview />
    </>
  );
}
