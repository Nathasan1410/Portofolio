# Nathanael Santoso - Personal Website

A modern, high-performance personal website built with Next.js 14+, Tailwind CSS, and Shadcn UI.

## 🚀 Project Overview

This project is structured as a dual-purpose site:
1.  **Main Portfolio (`/`)**: A professional showcase of projects and skills.
2.  **Digital Namecard (`/card`)**: A Web3-styled profile card for quick links and contact info.

## 📂 Project Structure

- `app/page.tsx`: The entry point for the **Portfolio**.
- `app/card/page.tsx`: The entry point for the **Digital Namecard**.
- `components/portfolio/`: Components specific to the main portfolio website.
- `components/match-card/`: Components specific to the Digital Namecard.
- `components/ui/`: Reusable UI primitives (shadcn/ui).
- `public/`: Static assets (images, pdfs, etc.).

---

## 🏗️ Portfolio Expansion Guide (Future Nathan)

If you want to build this out into a full-blown portfolio, follow these steps:

### 1. Building the Portfolio Pages
Work inside `app/page.tsx` for the landing page. If you need sub-pages (like `/projects/my-app`), create a new folder under `app/` with a `page.tsx` inside it.

### 2. Adding Components
Keep things modular! 
- Create new sections in `components/portfolio/`.
- Example: `components/portfolio/testimonials.tsx` or `components/portfolio/skills-grid.tsx`.
- Import them into your main page.

### 3. Adding New Projects
1. Add project images to `public/images/projects/`.
2. Update the `Projects` component in `components/portfolio/projects.tsx`.
3. If you want a CMS feel, you can create a `projects.json` in `lib/` and map over it.

### 4. Styling & Icons
- Use **Tailwind CSS** for all styling.
- Use **Lucide React** for icons (already installed).
- Adding new Shadcn components: `npx shadcn@latest add [component-name]`.

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
