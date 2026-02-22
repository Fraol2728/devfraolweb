import { Link, useParams } from "react-router-dom";
import { getBlogBySlug } from "@/data/blog";

export const BlogDetail = () => {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <section className="px-4 sm:px-6 py-16 text-left">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl">Post not found</h1>
          <Link to="/blog" className="text-primary mt-4 inline-block">Back to blog</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 py-16 text-left">
      <article className="container max-w-4xl mx-auto rounded-2xl border border-border bg-card/70 p-8">
        <p className="text-xs uppercase text-primary">{post.category}</p>
        <h1 className="mt-2 text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{post.date}</p>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{post.content}</p>
      </article>
    </section>
  );
};
