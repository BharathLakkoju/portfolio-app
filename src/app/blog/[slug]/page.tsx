import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "~/lib/blog";
import { formatDate } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Button } from "~/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="pt-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Back link */}
        <AnimatedSection className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </Button>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection delay={0.1}>
          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl font-bold leading-tight mb-4 sm:text-3xl md:text-4xl">
            {post.title}
          </h1>

          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-5 text-sm text-text-muted border-y border-border py-4 mb-10">
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {post.readTime} min read
            </span>
          </div>
        </AnimatedSection>

        {/* MDX Content */}
        <AnimatedSection delay={0.2}>
          <div
            className="
              prose prose-invert prose-zinc max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-text-primary
              prose-h1:text-2xl prose-h1:mt-10 prose-h1:mb-4
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
              prose-h3:text-base prose-h3:mt-8 prose-h3:mb-2
              prose-p:text-text-secondary prose-p:leading-[1.85] prose-p:my-5
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-code:font-mono prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-border prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:my-6
              prose-blockquote:border-l-accent prose-blockquote:text-text-muted prose-blockquote:my-6
              prose-hr:border-border prose-hr:my-8
              prose-ul:text-text-secondary prose-ul:my-5 prose-ul:pl-6
              prose-ol:text-text-secondary prose-ol:my-5 prose-ol:pl-6
              prose-li:my-2 prose-li:leading-relaxed
              prose-li:marker:text-accent
              prose-table:text-sm prose-th:text-text-primary prose-td:text-text-secondary
            "
          >
            <MDXRemote source={post.content} />
          </div>
        </AnimatedSection>

        {/* Footer */}
        <AnimatedSection
          delay={0.3}
          className="mt-16 border-t border-border pt-8"
        >
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft size={16} />
              All posts
            </Link>
          </Button>
        </AnimatedSection>
      </article>
    </div>
  );
}
