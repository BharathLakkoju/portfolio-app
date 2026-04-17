import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { estimateReadTime } from "./utils";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  readTime: number;
  content: string;
};

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

export function getAllPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(BLOGS_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? new Date().toISOString(),
        tags: (data.tags as string[]) ?? [],
        description: (data.description as string) ?? "",
        readTime: estimateReadTime(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? new Date().toISOString(),
    tags: (data.tags as string[]) ?? [],
    description: (data.description as string) ?? "",
    readTime: estimateReadTime(content),
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
