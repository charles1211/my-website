# Portfolio Website — "Cinematic Dark" Redesign Spec

**Date:** 2026-03-12
**Approach:** A — Cinematic Dark
**Stack:** Next.js 12 + TypeScript + MUI v5 + framer-motion (new dep)
**Constraint:** Zero changes to business logic, form submission, project data, or CV download behaviour.

---

## 0. Goals

- Full top-to-bottom visual and interaction overhaul
- Retain brand identity: `#121F28` background, `#FF715B` (tomato) accent, `#FCA311` (orange) secondary
- Add high-energy animations: magnetic cursor, stagger reveals, 3D tilt, scroll-triggered counters
- Improve layout hierarchy, typography spacing, and section consistency
- Make the site competitive with premium developer portfolios (Brittany Chiang / Josh Comeau tier)

---

## 1. New Dependency

| Package | Version | Purpose |
|---|---|---|
| `framer-motion` | latest compatible with React 17 | Magnetic cursor, stagger animations, AnimatePresence, spring physics, 3D tilt |

Install: `npm install framer-motion`

---

## 2. Global Changes

### 2.1 Magnetic Cursor
**New file:** `components/MagneticCursor.tsx`

- A `32px` circle that follows the mouse using framer-motion `useMotionValue` + `useSpring` (`stiffness: 400, damping: 28`)
- On hover over any `<a>`, `<button>`, or `[data-magnetic]` element: scales to `2.5x`, applies `mix-blend-mode: difference`
- Hidden on touch devices via `@media (pointer: coarse)`
- Rendered in `pages/_app.tsx` above all page content

### 2.2 Sticky Floating Navbar
**New file:** `components/Navbar.tsx`

- Fixed position, centered, pill shape (`border-radius: 50px`)
- Background: `rgba(18, 31, 40, 0.75)`, `backdropFilter: blur(20px)`, `1px solid rgba(255,113,91,0.15)`
- On scroll > 80px: border opacity increases to `0.35`, blur strengthens
- Links: `Home · About · Projects · Contact` — smooth scroll to section IDs
- Active section tracked via `IntersectionObserver` watching `#home-section`, `#about-section`, `#project-section`, `#contact-section`
- Active link: animated underline dot in `#FF715B`
- Mobile: hamburger icon → full-screen overlay with framer-motion staggered link entrances
- Rendered in `pages/index.tsx` before the hero grid

### 2.3 Global CSS (`styles/globals.css`)
- `scroll-behavior: smooth`
- Custom scrollbar: `8px` wide, `#FF715B` thumb, `rgba(18,31,40,0.5)` track
- Hide default cursor when magnetic cursor is active: `cursor: none` on `body`

### 2.4 Section Ghost Numbers
Sections `About (03)`, `Projects (04 — wait, actually 03)`, `Contact (04)` each get an absolutely positioned ghost number behind the section heading:
- `font-size: 200px`, `font-weight: 900`, `opacity: 0.04`, `color: white`
- Positioned so it sits behind the heading text

Section numbering:
- `01` — Hero (not shown, implied)
- `02` — About
- `03` — Projects
- `04` — Contact

---

## 3. Hero Section (`pages/index.tsx`)

### 3.1 Text Entrance Animation
- `"Hello."` — character-by-character stagger via framer-motion `staggerChildren`: each letter animates from `{ y: 40, opacity: 0 }` → `{ y: 0, opacity: 1 }`, `0.04s` stagger
- `"I'm Charles"` — fades in after stagger completes (`delay: ~0.5s`)
- Typewriter role text — keeps existing JS logic; cursor upgraded to animated gradient bar (`#FF715B → #FCA311`)
- Subtitle — fade-up, `delay: ~0.8s`
- Resume button — fade-up last, `delay: ~1s`

### 3.2 Image Side
- Existing blob shape, orbit ring, floating code chips — kept, enhanced with framer-motion spring physics (replace raw CSS `@keyframes`)
- New: `6` small orbiting tech icon dots (React, TS, Node, Next.js, CSS, HTML) rotating at different radii and speeds around the profile image, replacing the text chip labels
- Profile image glow (`conic-gradient`) rotation offset driven by global cursor X position via CSS custom property `--cursor-x`

### 3.3 Background Layer
- SVG dot-grid pattern behind ColorBends: `opacity: 0.06`, dots pulse in opacity (CSS `@keyframes breathing`, infinite, `4s`)
- ColorBends dynamic import unchanged

### 3.4 Scroll Indicator
- Small bouncing chevron below the hero CTA area
- Fades out via framer-motion `useScroll` + `useTransform` when user scrolls past `200px`

---

## 4. Tech Stack Section (`pages/index.tsx`)

**Replaces:** The scrolling marquee skills bar.

### 4.1 Layout
- Section heading: `"Tech Stack"` — large, centered, same typographic scale as other headings
- Responsive grid: 7 cols desktop, 4 cols tablet, 3 cols mobile

### 4.2 Skill Cards
- Size: `90×90px` desktop
- Background: `rgba(255,113,91,0.04)`, border: `1px solid rgba(255,113,91,0.12)`, `border-radius: 16px`
- Tech icon (`~40px`) in brand color, label below in `#A0AEC0` at `12px`
- `whileHover`: `y: -10`, border glows in icon's brand color, icon scales `1.2x`
- `onMouseMove` 3D tilt: `rotateX` / `rotateY` via `useMotionValue`, max `15deg`
- Scroll-triggered stagger entrance: `0.05s` per card

### 4.3 Tech List (14 items)
TypeScript, JavaScript, React, Next.js, Node.js, CSS, HTML, PostgreSQL, MySQL, Supabase, Prisma, Tailwind CSS, Git, Azure

### 4.4 Section Separator
Diagonal `clip-path: polygon` separator between hero and tech stack section for layered depth.

---

## 5. About Section (`components/aboutMe.tsx`)

### 5.1 Layout
Two rows:
1. **Top:** bio + stats (left) | services cards (right)
2. **Bottom:** (no extra row — tech stack is its own section above)

### 5.2 Bio + Stats (left)
- Section code label: `"// about me"` in `#FF715B`, small caps, above heading
- Heading `"About me"` gets gradient fill: `#FF715B → #FCA311` via `background-clip: text`
- Bio paragraph: word-by-word reveal animation on scroll (`staggerChildren`, `0.015s` per word, `y: 10 → 0`)
- Stat counters: count-up animation on scroll entry using `useInView` — numbers tick `0 → final value` over `1.5s` with easing
- Stat cards keep existing hover lift + gain 3D tilt

### 5.3 Services Cards (right — replaces timeline)
Three tall glassmorphism cards:
- `Web Development`, `App Development`, `Cloud & Hosting`
- Background: `rgba(26,45,58,0.8)`, `backdropFilter: blur(16px)`
- Large icon at top, one-liner description, animated perimeter border trace on hover
- Stagger entrance from right on scroll

### 5.4 Mobile
Single column. Word-reveal simplifies to standard fade-up. Service cards stack vertically.

---

## 6. Projects Section (`components/projects.tsx`)

### 6.1 Filter Tabs
- Pills: `All · Frontend · Full-Stack · Freelance`
- Category inference from existing data (no new data fields):
  - Frontend: projects with only `react`, `css`, `html`, `vite`, `chakra-ui`, `typescript` (no backend deps)
  - Full-Stack: projects with `node.js`, `next.js`, `supabase`, `prisma`, `postgresql`, `mysql`, `azure`
  - Freelance: projects where `type === 'Freelance Project'`
  - All: all projects
- Active tab: filled `#FF715B` pill. Tab switch: framer-motion `AnimatePresence` — exit `{ scale: 0.8, opacity: 0 }`, enter staggered cascade

### 6.2 Card Grid
- 3 columns desktop, 2 tablet, 1 mobile
- Card height: `380px`
- Thumbnail fills card as background (`object-fit: cover`)
- Persistent gradient overlay at bottom: `linear-gradient(to top, rgba(18,31,40,0.98) 40%, transparent)`
- Project name + tech chips always visible at bottom

### 6.3 Card Hover
- Thumbnail: `scale: 1.08`
- Glassmorphism description overlay slides up from bottom: full description (3-line `line-clamp`), action buttons
- Border animates: `rgba(255,113,91,0.12)` → `rgba(255,113,91,0.5)` + glow shadow
- 3D tilt: max `10deg`

### 6.4 Section Header
- Ghost number `"03"` behind heading (`opacity: 0.04`, `font-size: 200px`)

### 6.5 Mobile
- Replace `react-multi-carousel` with native CSS `scroll-snap` container (no extra library)
- `scroll-snap-type: x mandatory` on container, `scroll-snap-align: start` on each card

### 6.6 Entrance Animation
- Scroll-triggered stagger, `0.07s` per card

---

## 7. Contact Section (`components/contact.tsx`)

### 7.1 Left Side
- Ghost number `"04"` behind heading
- `"Have a project? Let's talk!"` keeps existing text, gets word-reveal animation
- Quick-contact chips row: `Email`, `LinkedIn`, `GitHub` — pill with icon, opens respective links
  - Email: `charlescabarrus99@gmail.com`
  - LinkedIn: existing footer link
  - GitHub: existing footer link

### 7.2 Form Card
- Glassmorphism: `backdropFilter: blur(20px)`, `rgba(26,45,58,0.6)` bg, `1px solid rgba(255,113,91,0.2)` border, inner top-edge glow
- Text fields: replace MUI underline with full-border style; on focus border animates bottom-up via `clip-path` reveal in `#FF715B`
- Submit button: full-width, gradient fill `#FF715B → #FCA311`, magnetic hover
- Existing `handleSubmit`, validation, formbold endpoint, toast notifications — **unchanged**
- On success: framer-motion `AnimatePresence` spawns 12 small colored dots bursting outward from button

### 7.3 Mobile
- Single column. Submit button always below form (existing mobile layout logic kept).

---

## 8. Footer (`components/footer.tsx`)

- Keeps all content, social links, click handlers — **unchanged**
- Top border: animated gradient that slowly shifts hue via CSS `@keyframes` on `background-position`
- Social icons: CSS ripple effect on click
- `ScrollToTopButton` from `common/scrollToTopButton.tsx` — kept as-is

---

## 9. Files Changed / Created

| File | Action |
|---|---|
| `components/MagneticCursor.tsx` | **Create** |
| `components/Navbar.tsx` | **Create** |
| `pages/_app.tsx` | **Edit** — add `MagneticCursor`, `Navbar` |
| `pages/index.tsx` | **Edit** — hero animations, tech stack section |
| `components/aboutMe.tsx` | **Edit** — full layout redesign |
| `components/projects.tsx` | **Edit** — card grid, filter tabs, mobile scroll-snap |
| `components/contact.tsx` | **Edit** — glassmorphism form, quick-contact chips |
| `components/footer.tsx` | **Edit** — animated border, ripple icons |
| `styles/globals.css` | **Edit** — scroll-behavior, scrollbar, cursor:none |
| `package.json` | **Edit** — add framer-motion |

---

## 10. Constraints

- `ColorBends.tsx` — **do not touch** (dynamic import, Three.js, works correctly)
- `projectsDialog.tsx` — **do not touch** (dialog logic unchanged)
- `common/scrollToTopButton.tsx` — **do not touch**
- `hooks/` — **do not touch**
- `utility/` — **do not touch**
- All form logic, CV download, toast notifications — **unchanged**
- Project `data` array in `projects.tsx` — **unchanged**
