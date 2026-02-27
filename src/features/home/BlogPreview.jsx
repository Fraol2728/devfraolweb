import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMockApi } from "@/context/MockApiContext";

export const BlogPreview = () => {
  const { blogs = [] } = useMockApi();
  const latestPosts = blogs.slice(0, 3);

  return (
    <section id="blog-preview" className="px-4 sm:px-6 py-16">
      <div className="container max-w-6xl mx-auto text-left">
        <h2 className="text-3xl sm:text-4xl">From the Blog</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {latestPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-2xl border border-border bg-card/70 p-5"
            >
              <p className="text-xs uppercase text-primary">{post.category}</p>
              <h3 className="mt-2 text-xl">{post.title}</h3>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">{post.date}</p>
              <Link to={`/blogs/${post.slug}`} className="mt-4 inline-block font-semibold text-primary hover:underline">
                Read More
              </Link>
            </motion.article>
          ))}
        </div>
        {latestPosts.length === 0 ? <p className="mt-6 text-sm text-muted-foreground">Blog highlights are being prepared.</p> : null}
        <Link to="/blogs" className="mt-6 inline-flex cosmic-button">
          See More
        </Link>
      </div>
    </section>
  );
};
