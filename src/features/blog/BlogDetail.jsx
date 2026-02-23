import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogs } from "@/features/blog/hooks/useBlogs";
import { BlogCard } from "@/features/blog/BlogCard";

export const BlogDetailContent = () => {
  const { slug } = useParams();
  const { blogs: blogPosts = [], loading } = useBlogs();
  const post = blogPosts.find((item) => item.slug === slug);

  if (loading.list) {
    return <section className="py-20 text-center text-muted-foreground">Loading article...</section>;
  }

  if (!post) {
    return (
      <section className="rounded-2xl border border-border bg-card/60 p-8 text-left">
        <h1 className="text-3xl">Post not found</h1>
        <p className="mt-3 text-muted-foreground">The article you're looking for is unavailable.</p>
        <Link to="/blogs" className="mt-5 inline-flex rounded-full border border-primary px-4 py-2 text-primary">Back to Blog</Link>
      </section>
    );
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);

  return (
    <main className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-5xl text-left">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl border border-border">
          <img src={post.image} alt={post.imageAlt} loading="eager" decoding="async" className="h-72 w-full object-cover md:h-96" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">{post.category} • {post.date}</p>
            <h1 className="mt-3 text-3xl md:text-5xl">{post.title}</h1>
          </div>
        </motion.header>

        <article className="mt-10 space-y-8 rounded-2xl border border-border bg-card/60 p-6 leading-8 md:p-10">
          {(post.content ?? []).map((block, index) => (
            <motion.section key={block.heading} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.08 }}>
              <h2 className="text-2xl">{block.heading}</h2>
              <div className="mt-3 space-y-4 text-muted-foreground">
                {(block.paragraphs ?? []).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.section>
          ))}
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl">Related Posts</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} index={index} compact />
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/blogs" className="rounded-full border border-border px-5 py-2 font-medium hover:border-[#FF3B30] hover:text-[#FF3B30]">
            Back to Blog
          </Link>
          <Link to="/courses" className="cosmic-button">
            Start Learning
          </Link>
        </div>
      </div>
    </main>
  );
};
