import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useBlogs } from "@/features/blog/hooks/useBlogs";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Section } from "@/shared/ui/Section";
import { BlogCard } from "@/features/blog/BlogCard";
import { BlogFilter } from "@/features/blog/BlogFilter";

const PAGE_STEP = 6;

export const BlogPage = () => {
  const { blogs: blogPosts = [], loading } = useBlogs();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(PAGE_STEP);

  const filteredPosts = useMemo(() => {
    const byCategory = selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory);

    return [...byCategory].sort((a, b) => {
      if (selectedSort === "Popular") return b.popularity - a.popularity;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [blogPosts, selectedCategory, selectedSort]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <Container className="py-16">
      <PageHeader eyebrow="Insights & Updates" title="Dev Fraol Academy Blog" description="Stay updated with our courses and design insights" className="bg-linear-to-r from-primary/10 via-card/80 to-card/60" />
      <Section>

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
          {loading.list ? <p className="text-sm text-muted-foreground">Loading blog posts...</p> : null}
          {!loading.list && visiblePosts.length === 0 ? <EmptyState text="No blog posts available right now." /> : null}
          {!loading.list && visiblePosts.map((post, index) => <BlogCard key={post.slug} post={post} index={index} />)}
        </section>

        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            onClick={() => setVisibleCount((current) => current + PAGE_STEP)}
            disabled={!hasMore || loading.list}
            variant="outline" className="rounded-full disabled:cursor-not-allowed disabled:opacity-55" aria-label="Load more blog posts"
          >
            {hasMore ? "See More" : "More posts coming soon"}
          </Button>
        </div>
      </Section>
    </Container>
  );
};
