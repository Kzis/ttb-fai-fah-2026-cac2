# TTB Fai-Fah 2026 — Copilot Instructions

## Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **UI Skill**: `minimalist-ui` (Leonxlnx/taste-skill) — editorial Notion-style minimalism

---

## Design Philosophy

Apply the `minimalist-ui` skill as the base protocol. This project is a **Notion-style, document-first interface** with warm editorial whitespace, bento-grid layouts, and ultra-flat components — adapted with the **TTB Fai-Fah brand palette**.

> ไฟ (Fire) = warm amber/orange energy of youth  
> ฟ้า (Sky) = open, hopeful blue of volunteers and community

---

## Color Palette Override (TTB Fai-Fah Brand)

Replace the default `minimalist-ui` monochrome palette with this brand-aligned system:

| Role | Hex | Usage |
|------|-----|-------|
| Canvas | `#FAFAF9` | Page background (warm off-white) |
| Surface | `#FFFFFF` | Cards, panels |
| Border | `#E8E6E1` | All dividers, card borders |
| Text Primary | `#1A1714` | Body, headings (warm off-black) |
| Text Secondary | `#7C7167` | Captions, metadata (warm gray) |
| **Fai (Fire)** | `#F26522` | Primary accent — CTAs, highlights |
| Fai Hover | `#D4541A` | Hover/active state of primary accent |
| Fai Pale | `#FEF0E7` | Tag backgrounds, subtle tints |
| Fai Pale Text | `#A0390E` | Text on pale fire backgrounds |
| **Fah (Sky)** | `#0073C6` | Secondary accent — links, info states |
| Fah Pale | `#E3F2FD` | Tag backgrounds, info panels |
| Fah Pale Text | `#00508A` | Text on pale sky backgrounds |
| Warm Neutral | `#F5F2ED` | Section backgrounds, alternating rows |

### CSS Variables (add to `globals.css`)
```css
:root {
  --color-canvas: #FAFAF9;
  --color-surface: #FFFFFF;
  --color-border: #E8E6E1;
  --color-text-primary: #1A1714;
  --color-text-secondary: #7C7167;
  --color-fai: #F26522;
  --color-fai-hover: #D4541A;
  --color-fai-pale: #FEF0E7;
  --color-fai-pale-text: #A0390E;
  --color-fah: #0073C6;
  --color-fah-pale: #E3F2FD;
  --color-fah-pale-text: #00508A;
  --color-warm-neutral: #F5F2ED;
}
```

---

## Typography

- **Heading (serif)**: `'Instrument Serif'`, `'Newsreader'`, serif — tight tracking `-0.03em`, line-height `1.1`
- **Body / UI (sans)**: `'Geist Sans'`, `'Helvetica Neue'`, sans-serif — line-height `1.6`
- **Code / Meta**: `'Geist Mono'`, `'JetBrains Mono'`, monospace
- Body text: `#1A1714`, never pure black
- Secondary: `#7C7167`

---

## Absolute Constraints (from `minimalist-ui` — strictly enforced)

- NO Inter, Roboto, or Open Sans
- NO heavy shadows (`shadow-md`, `shadow-lg`) — use `0 1px 4px rgba(0,0,0,0.04)` max
- NO gradients or glassmorphism
- NO pill-shaped large containers
- NO emojis in code or markup
- NO Lorem Ipsum — use realistic Thai/English content
- NO AI clichés: "seamless", "unleash", "next-gen", "game-changer"
- Borders always: `1px solid #E8E6E1`
- Card border-radius: `8px` or `12px` max
- Primary CTA: background `#F26522`, text `#FFFFFF`, border-radius `4px–6px`, no shadow

---

## Layout Rules

- Main content width: `max-w-4xl` or `max-w-5xl`
- Section vertical padding: `py-24` or `py-32`
- Bento grid: CSS Grid, asymmetrical, generous internal padding `24px–40px`
- Section backgrounds alternate between `#FAFAF9` and `#F5F2ED` for rhythm — never solid orange/blue

---

## Motion (subtle, invisible)

- Scroll entry: `translateY(12px)` + `opacity: 0` → resolved over `600ms`, `cubic-bezier(0.16, 1, 0.3, 1)`
- Use `IntersectionObserver` — never `window.scroll`
- Staggered grid items: `animation-delay: calc(var(--index) * 80ms)`
- Animate only `transform` and `opacity` — no layout-triggering properties

---

## Next.js Conventions

- Use **App Router** (`app/` directory)
- Server Components by default; add `'use client'` only when needed (interactivity, hooks)
- Use `next/image` for all images with proper `alt` attributes
- Use `next/font` to load `Instrument_Serif` and `Geist` fonts
- File structure: `app/`, `components/ui/`, `components/sections/`, `lib/`, `public/`
- No `pages/` directory

---

## Iconography

- Use **Phosphor Icons** (Bold or Fill weight) via `phosphor-react` or `@phosphor-icons/react`
- Consistent stroke weight across all icons
- No Lucide, Feather, or Heroicons

---

## Imagery

- Photos: desaturated, warm-toned, high quality
- Placeholder: `https://picsum.photos/seed/{context}/1200/800`
- Never use oversaturated stock photos
- Hero depth: soft radial warm glow `radial-gradient(ellipse at 60% 0%, rgba(242,101,34,0.04) 0%, transparent 60%)`
