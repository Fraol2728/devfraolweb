import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.12 },
  }),
};

export const BlogPreview = ({ posts = [], loading = false }) => {
  const displayPosts = loading ? Array.from({ length: 3 }) : posts.slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8" aria-labelledby="blog-preview">
      <h2 id="blog-preview" className="text-3xl font-bold text-white md:text-4xl">
        Latest Blog Posts
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post, idx) => (
          <motion.article key={post?.id ?? idx} variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={idx} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
            {loading ? (
              <div className="h-72 animate-pulse bg-slate-800" />
            ) : (
              <>
                <img src={post.image} alt={`${post.title} article cover`} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{post.excerpt}</p>
                  <a href="/blogs" className="mt-5 inline-flex text-sm font-semibold text-cyan-300 underline-offset-4 hover:underline focus-visible:underline">
                    Read More
                  </a>
                </div>
              </>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
};
