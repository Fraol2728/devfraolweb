import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog";

export const Blog = () => {
  return (
    <section className="px-4 sm:px-6 py-16">
      <div className="container max-w-6xl mx-auto text-left">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl">
          Blog
        </motion.h1>
        <p className="mt-3 text-muted-foreground">Insights for developers, designers, and students building modern portfolios.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-border bg-card/70 p-6">
              <p className="text-xs uppercase text-primary">{post.category}</p>
              <h2 className="mt-2 text-2xl">{post.title}</h2>
              <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
              <p className="mt-4 text-sm text-muted-foreground">{post.date}</p>
              <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-primary font-semibold hover:underline">
                Read More
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
