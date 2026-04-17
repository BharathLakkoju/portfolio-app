"use client";

import { motion } from "framer-motion";
import { BlogCard } from "~/components/shared/BlogCard";
import { StaggerChildren, fadeInUp } from "~/components/shared/AnimatedSection";
import { type BlogPost } from "~/lib/blog";

type BlogGridProps = {
  posts: Omit<BlogPost, "content">[];
};

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2" staggerDelay={0.1}>
      {posts.map((post) => (
        <motion.div key={post.slug} variants={fadeInUp}>
          <BlogCard post={post} />
        </motion.div>
      ))}
    </StaggerChildren>
  );
}
