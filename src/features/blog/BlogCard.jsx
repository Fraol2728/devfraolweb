import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogs } from "@/features/blog/hooks/useBlogs";
import { Button } from "@/shared/ui/Button";

const BlogCardComponent = ({ post, index = 0, compact = false }) => {
  const { openBlog, actionLoading } = useBlogs();
  const actionKey = `open-blog:${post.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-primary/8 group-hover:to-primary/3" />
      <img
        src={post.image}
        alt={post.imageAlt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${compact ? "h-38" : "h-52"}`}
      />
      <div className="relative p-6 text-left">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">
          {post.category} • {post.date}
        </p>
        <h2 className={`mt-3 ${compact ? "text-xl" : "text-2xl"}`}>{post.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <Link to={`/blogs/${post.slug}`} onClick={() => openBlog(post.slug)} className="mt-5 inline-flex" aria-label={`Read blog ${post.title}`}><Button variant="outline" className="rounded-full">{actionLoading[actionKey] ? "Opening..." : "Read More"}</Button></Link>
      </div>
    </motion.article>
  );
};

export const BlogCard = memo(BlogCardComponent);
