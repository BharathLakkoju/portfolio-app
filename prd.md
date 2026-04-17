## 📄 Product Requirements Document (PRD)

### **Developer Portfolio + Git-based Blogging Platform (2026 Stack)**

---

# 1. 🧭 Product Overview

**Product Name:** DevFolio (working name)
**Type:** Static-first developer portfolio with Git-driven MDX blogging

**Description:**
A modern, high-performance personal portfolio website that showcases developer information, projects, work experience, and blogs. Blog content is managed through Git by adding/updating `.mdx` files, which automatically rebuild and deploy the site.

---

# 2. 🎯 Objectives

- Provide a **fast, SEO-optimized portfolio**
- Enable **zero-CMS blogging via MDX**
- Maintain a **developer-first workflow (Git-based content)**
- Keep architecture **minimal, scalable, and maintainable**
- Allow future extensibility (admin panel, AI content, analytics)

---

# 3. 👤 Target Users

### Primary Users

- Developers (students → senior engineers)
- Tech bloggers
- Indie hackers

### Secondary Users

- Recruiters (view portfolio)
- Visitors (read blogs, explore projects)

---

# 4. 🧩 Core Features

## 4.1 Portfolio Pages

### 🏠 Home

- Hero section (name, tagline, CTA)
- Social links
- Featured projects

### 👤 About

- Bio
- Skills (categorized)
- Experience timeline

### 💼 Projects

- List of projects
- Each project includes:
  - Title
  - Description
  - Tech stack
  - GitHub link
  - Live demo

---

## 4.2 📝 Blog System (Core Feature)

### Requirements

- Blog content stored as `.mdx` files inside repo
- Auto-generated blog pages

### Features

- Blog listing page
- Individual blog pages (`/blog/[slug]`)
- Metadata support:
  - title
  - date
  - tags
  - description

- Tag filtering (optional v2)

---

### 🧠 Blog Workflow

1. Developer creates a new file:

```
/content/blogs/my-blog.mdx
```

2. Adds frontmatter:

```mdx
---
title: "My Blog"
date: "2026-04-17"
tags: ["React", "Next.js"]
description: "Blog summary"
---
```

3. Pushes to GitHub

4. Deployment triggers → site updates automatically

---

## 4.3 📬 Contact

- Contact form with:
  - Name
  - Email
  - Message

- Backend handled via:
  - Next.js Server Actions OR external API

- Email delivery integration

---

## 4.4 🎨 UI/UX

- Minimal, modern design
- Monochrome theme (default)
- Responsive (mobile-first)
- Smooth animations

---

## 4.5 ⚡ Performance & SEO

- Static Site Generation (SSG)
- Optimized images
- Metadata (OpenGraph, Twitter cards)
- Sitemap generation

---

# 5. 🏗️ Technical Architecture

## 5.1 Frontend

- **Framework:** Next.js (App Router)
- **Language:** TypeScript

---

## 5.2 Styling & UI

- **Styling:** Tailwind CSS
- **Components:** shadcn/ui

---

## 5.3 Content Layer

- **Content Format:** MDX
- **Processing:** Contentlayer (or Velite)

---

## 5.4 Animations

- **Library:** Framer Motion

---

## 5.5 Deployment

- **Platform:** Vercel
- Auto-deploy on Git push

---

## 5.6 Contact / Email

- Server Actions OR:
  - Resend
  - Formspree

---

## 5.7 Optional Integrations

- Analytics: Vercel Analytics
- Comments: Giscus

---

# 6. 📂 Project Structure

```
/app
  /page.tsx
  /about
  /projects
  /blog
    /[slug]

/content
  /blogs
    *.mdx

/components
/lib
/styles
/public
```

---

# 7. 🔄 Data Flow

### Blog Rendering Flow

1. MDX files stored in `/content/blogs`
2. Contentlayer parses MDX → JSON
3. Next.js generates static pages
4. Pages deployed via Vercel

---

# 8. 🚀 Non-Functional Requirements

## Performance

- Lighthouse score > 90
- First Contentful Paint < 2s

## SEO

- Structured metadata
- Clean URLs (`/blog/slug`)

## Accessibility

- WCAG basic compliance
- Keyboard navigation support

## Maintainability

- Clean modular structure
- Typed data models

---

# 9. 📈 Future Enhancements (V2+)

- Admin dashboard (upload MDX via UI → commit to repo)
- AI blog generation assistant
- GitHub profile auto-sync
- Search functionality (Fuse.js)
- Tag/category filtering
- Dark/light theme toggle
- Multi-language support

---

# 10. ⚠️ Constraints & Trade-offs

| Decision     | Trade-off                    |
| ------------ | ---------------------------- |
| MDX over CMS | No non-dev editing           |
| Static-first | Rebuild required for updates |
| No DB        | Limited dynamic features     |

---

# 11. 🧪 Success Metrics

- Page load time < 2s
- Blog publishing time < 2 min (via Git)
- Lighthouse score > 90
- Deployment success rate 100%
- Recruiter engagement (qualitative)

---

# 12. 🛠️ Milestones

### Phase 1 (MVP)

- Portfolio pages
- Blog system (MDX)
- Deployment setup

### Phase 2

- Contact form
- SEO enhancements
- Animations

### Phase 3

- Analytics
- Comments
- UI polish

---

# 13. 🧠 Key Differentiator

> “A **developer-native portfolio system** where content = code, and publishing = git push.”

---

This PRD is intentionally **lean + production-focused** — no fluff, just what you actually need to build and ship.
