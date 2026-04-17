# Developer Portfolio + Blog System

A modern, content-driven developer portfolio built with Next.js, featuring MDX-powered blogging, project showcases, and a clean, animated UI.

---

## ✨ Features

- ⚡ Built with Next.js App Router
- 📝 MDX-based blogging system
- 🧩 Modular content architecture (profile, projects, skills, experience)
- 🎨 Minimal UI with smooth animations (Framer Motion)
- 📱 Fully responsive layout
- 📊 Dynamic project filtering
- 📬 Contact form integration
- 🌐 SEO-optimized metadata
- 🧱 Reusable UI component system

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Content:** MDX + JSON
- **UI Components:** Custom + Radix patterns

---

## 📁 Project Structure

```

src/
app/                # Routes (pages, blog, projects, etc.)
components/         # UI & layout components
lib/                # Data, utilities, blog logic
styles/             # Global styles
env.js              # Environment config

content/
blogs/              # MDX blog posts

````

---

## ⚙️ Core Concepts

### Content-Driven Architecture

All portfolio content is managed via structured data:

- `profile` → personal details
- `skills` → categorized tech stack
- `projects` → portfolio projects
- `experience` → work history
- `education` → academic background

---

### Blogging System

- Uses MDX for writing posts
- Supports:
  - Tags
  - SEO metadata
  - Read time estimation
- Auto-generates routes via `[slug]`

---

### Project Showcase

- Categorized filtering (Full Stack, AI, Tools, etc.)
- Each project includes:
  - Description
  - Tech stack
  - GitHub + Live links

---

### UI & Animations

- Smooth entrance animations using Framer Motion
- Staggered component rendering
- Minimal, typography-focused design

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

---

## 📝 Adding Content

### Add a Blog Post

Create a new `.mdx` file inside:

```
/content/blogs/
```

Example frontmatter:

```md
---
title: "My Blog Post"
date: "2025-01-01"
description: "Short description"
tags: ["nextjs", "react"]
---
```

---

### Update Portfolio Data

Modify:

```
src/lib/data.ts
```

---

## 📬 Contact Form

* Uses Formspree for handling submissions
* Replace:

```ts
https://formspree.io/f/YOUR_FORM_ID
```

with your actual endpoint

---

## 🎯 Use Cases

* Personal developer portfolio
* Technical blog
* Resume website
* Indie hacker landing page
* SaaS personal branding
