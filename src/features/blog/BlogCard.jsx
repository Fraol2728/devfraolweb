import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const BlogCard = ({ post, index = 0, compact = false }) => {
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
        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          compact ? "h-38" : "h-52"
        }`}
      />
      <div className="relative p-6 text-left">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">
          {post.category} • {post.date}
        </p>
        <h2 className={`mt-3 ${compact ? "text-xl" : "text-2xl"}`}>{post.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="mt-5 inline-flex rounded-full border border-primary/50 px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:border-[#FF3B30] hover:bg-[#FF3B30] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Read More
        </Link>
      </div>
    </motion.article>
  );
};
