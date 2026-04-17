import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatDate } from "~/lib/utils";
import { type BlogPost } from "~/lib/blog";

type BlogCardProps = {
  post: Omit<BlogPost, "content">;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="group flex flex-col h-full hover:border-border/80 transition-colors duration-200">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors duration-200">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 px-4 pb-4 pt-0">
          <p className="text-xs leading-relaxed text-text-secondary mb-4 flex-1">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-[10px] text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {formatDate(post.date)}
            </span>
            <span>&middot;</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {post.readTime} min read
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
