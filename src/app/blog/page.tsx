import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "~/lib/blog";
import { formatDate } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles on full stack development, AI engineering, and the tools I build.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Blog</h1>
          <p className="text-xs text-text-muted">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-text-muted py-12">
            No posts yet. Add <code className="font-mono">.mdx</code> files to{" "}
            <code className="font-mono">/content/blogs</code>.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-baseline justify-between gap-4 py-3.5 group"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors duration-150">
                    {post.title}
                  </span>
                  <span className="text-[10px] text-text-muted shrink-0 tabular-nums">
                    {formatDate(post.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
