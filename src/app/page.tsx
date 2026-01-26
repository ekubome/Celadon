import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedWorks } from "@/components/sections/FeaturedWorks";
import { RecentPosts } from "@/components/sections/RecentPosts";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedWorks />
      <RecentPosts />
      <ContactCTA />
    </>
  );
}
