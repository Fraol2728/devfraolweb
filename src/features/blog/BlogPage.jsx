import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useMockApi } from "@/context/MockApiContext";
import { BlogCard } from "@/features/blog/BlogCard";
import { BlogFilter } from "@/features/blog/BlogFilter";

const PAGE_STEP = 6;

export const BlogPage = () => {
  const { blogs: blogPosts } = useMockApi();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(PAGE_STEP);

  const filteredPosts = useMemo(() => {
    const byCategory =
      selectedCategory === "All"
        ? blogPosts
        : blogPosts.filter((post) => post.category === selectedCategory);

    return [...byCategory].sort((a, b) => {
      if (selectedSort === "Popular") {
        return b.popularity - a.popularity;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [selectedCategory, selectedSort]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <main className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-r from-primary/10 via-card/80 to-card/60 px-6 py-14 text-left md:px-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,59,48,0.25),_transparent_55%)]" />
          <p className="relative text-xs uppercase tracking-[0.3em] text-primary">Insights & Updates</p>
          <h1 className="relative mt-4 text-4xl md:text-5xl">Dev Fraol Academy Blog</h1>
          <p className="relative mt-4 max-w-2xl text-muted-foreground">
            Stay updated with our courses and design insights
          </p>
        </motion.header>

        <BlogFilter
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setVisibleCount(PAGE_STEP);
          }}
          onSortChange={(sort) => {
            setSelectedSort(sort);
            setVisibleCount(PAGE_STEP);
          }}
        />

        <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-label="Blog posts">
          {visiblePosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </section>

        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => setVisibleCount((current) => current + PAGE_STEP)}
            disabled={!hasMore}
            className="rounded-full border border-primary/60 px-6 py-3 font-semibold text-primary transition-all duration-300 hover:border-[#FF3B30] hover:bg-[#FF3B30] hover:text-white disabled:cursor-not-allowed disabled:opacity-55"
          >
            {hasMore ? "See More" : "More posts coming soon"}
          </motion.button>
        </div>
      </div>
    </main>
  );
};
