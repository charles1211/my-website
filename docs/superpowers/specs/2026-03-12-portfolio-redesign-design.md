# Portfolio Website — "Cinematic Dark" Redesign Spec

**Date:** 2026-03-12
**Approach:** A — Cinematic Dark
**Stack:** Next.js 12.1.5 + React 17 + TypeScript 4.6 + MUI v5 + framer-motion v10.x (new dep)
**Constraint:** Zero changes to business logic, form submission, project data array, ColorBends component.

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
| `framer-motion` | `^10.18.0` (last branch supporting React 17 — do NOT use v11+) | Magnetic cursor, stagger animations, AnimatePresence, spring physics, 3D tilt |

Install: `npm install framer-motion@^10.18.0`

> **React 17 note:** framer-motion v11+ dropped React 17 support. Always pin to `^10.18.0`. Running `npm install framer-motion` without a version pin will install v11+ and break the build.

---

## 2. Global Changes

### 2.1 Magnetic Cursor
**New file:** `components/MagneticCursor.tsx`

- A `32px` circle that follows the mouse using framer-motion `useMotionValue` + `useSpring` (`stiffness: 400, damping: 28`)
- On hover over any `<a>`, `<button>`, or `[data-magnetic]` element: scales to `2.5x`, applies `mix-blend-mode: difference`
- Hidden on touch devices via `@media (pointer: coarse)`
- Must render at `z-index: 9999` to sit above all MUI stacking contexts (MUI modals use z-index 1300, tooltips 1500 — cursor must exceed these)
- Rendered in `pages/_app.tsx` **outside `ThemeProvider`** (needs no MUI theme) — placed as the first sibling before `CacheProvider`, before `ColorBends`, and before `Component`

### 2.2 Sticky Floating Navbar
**New file:** `components/Navbar.tsx`

- **The existing `components/Header/Header.tsx` (or wherever the current Header is located) is REMOVED** from `pages/_app.tsx`. The new `Navbar` fully replaces it. Add `Header` file to Section 9 as deleted.
- Fixed position, centered, pill shape (`border-radius: 50px`)
- Background: `rgba(18, 31, 40, 0.75)`, `backdropFilter: blur(20px)`, `1px solid rgba(255,113,91,0.15)`
- On scroll > 80px: border opacity increases to `0.35`, blur strengthens
- Links: `Home · About · Projects · Contact` — smooth scroll to section IDs: `#home-section`, `#about-section`, `#project-section`, `#contact-section`
- Active section tracked via `IntersectionObserver` watching those 4 IDs
- Active link: animated underline dot in `#FF715B`
- Mobile: hamburger icon → full-screen overlay with framer-motion staggered link entrances (`staggerChildren: 0.08s`, `y: 30 → 0`, `opacity: 0 → 1`)
- **Rendered in `pages/_app.tsx` inside `ThemeProvider`** (requires MUI context for breakpoints and styling) — placed immediately after the opening `ThemeProvider` tag, replacing the old `Header` import

### 2.3 Global CSS (`styles/globals.css`)
- `scroll-behavior: smooth`
- Custom scrollbar: `8px` wide, `#FF715B` thumb, `rgba(18,31,40,0.5)` track
- `cursor: none` on `body` when magnetic cursor is active (class-toggled by `MagneticCursor` component on mount; reverted on unmount)
- Delete the `@keyframes scrollLeft` rule — it was used only by the marquee which is removed in Section 4. No other consumer exists in the codebase.

### 2.4 Section Ghost Numbers
- Sections get absolutely positioned ghost numbers behind headings
- Style: `font-size: 200px`, `font-weight: 900`, `opacity: 0.04`, `color: white`, `aria-hidden="true"`, `user-select: none`
- Positioned so it visually sits behind the section heading (`z-index: -1` relative to the section container)

Section numbering:
- `01` — Hero (implied, not rendered as ghost)
- `02` — About
- `03` — Projects
- `04` — Contact

---

## 3. Hero Section (`pages/index.tsx`)

### 3.1 Text Entrance Animation
- `"Hello."` — character-by-character stagger via framer-motion `staggerChildren`: each letter animates from `{ y: 40, opacity: 0 }` → `{ y: 0, opacity: 1 }`, `0.04s` stagger, `duration: 0.4s` per letter
- `"I'm Charles"` — fades in after stagger completes (`delay: ~0.5s`, `{ y: 20, opacity: 0 } → { y: 0, opacity: 1 }`)
- Typewriter role text — keeps existing JS logic exactly; cursor upgraded to animated gradient bar (`#FF715B → #FCA311`)
- Subtitle — fade-up, `delay: ~0.8s`
- Resume button — fade-up last, `delay: ~1s`

### 3.2 Image Side
**Chips:** The existing 5 floating text chips (`</>`, `{ }`, `const`, `=> ()`, `git push`) are **removed**. They are replaced by **6 small orbiting tech icon dots** at different radii and speeds:
  - Icon set: React (`#61DAFB`), TypeScript (`#3178C6`), Node.js (`#339933`), Next.js (`#ffffff`), CSS (`#1572B6`), HTML (`#E34F26`)
  - Each is a `40×40px` circular badge with the tech icon at `20px`, positioned absolutely at a unique radius (`130px` to `240px`) and rotation offset
  - Uses framer-motion `animate={{ rotate: 360 }}` with `repeat: Infinity`, `duration` varies per icon (`12s`, `16s`, `20s`, `14s`, `18s`, `22s`), `ease: "linear"`

**Existing blob shape and orbit ring** — kept, converted from CSS `@keyframes` to framer-motion `animate` with spring config (`stiffness: 30, damping: 10, mass: 1`) for the float animation and `duration: 18s, ease: "linear"` for the orbit spin.

**Profile image glow** — `conic-gradient` rotation offset driven by global cursor X position via framer-motion `useMotionValue` + `useTransform` mapped to `[0, window.innerWidth] → [0deg, 360deg]`.

### 3.3 Background Layer
- SVG dot-grid pattern behind ColorBends: `opacity: 0.06`, dots pulse in opacity (CSS `@keyframes breathe`: `0%,100% { opacity: 0.04 } 50% { opacity: 0.10 }`, `duration: 4s`, infinite)
- ColorBends dynamic import — **unchanged**

### 3.4 Scroll Indicator
- Small animated chevron (`∨`) below the hero, centered
- framer-motion `animate={{ y: [0, 8, 0] }}`, `repeat: Infinity`, `duration: 1.6s`
- `opacity` driven by `useScroll` + `useTransform`: `[0, 200] → [1, 0]` (fades out on scroll)

---

## 4. Tech Stack Section (`pages/index.tsx`)

**Replaces:** The scrolling marquee `Box` block (lines 432–511 in the current `pages/index.tsx`). That entire block is deleted. The new Tech Stack section is inserted at the same DOM position between the hero grid and the About section grid.

### 4.1 Layout
- Section heading: `"Tech Stack"` — centered, `font-size: { lg: 60, xs: 36 }`, `font-weight: 700`
- Responsive grid: 7 cols desktop (`lg`), 4 cols tablet (`md`), 3 cols mobile (`xs`)

### 4.2 Skill Cards
- Size: `90×90px` desktop, `70×70px` mobile
- Background: `rgba(255,113,91,0.04)`, border: `1px solid rgba(255,113,91,0.12)`, `border-radius: 16px`
- Tech icon (`~40px` desktop, `~28px` mobile) in its brand color, label below in `#A0AEC0` at `12px`
- `whileHover`: framer-motion `{ y: -10, borderColor: <icon brand color>, scale: 1.05 }`; icon child `{ scale: 1.2 }`
- 3D tilt: `onMouseMove` calculates cursor offset within card, applies `rotateX` / `rotateY` via `useMotionValue` + `useSpring` (`stiffness: 300, damping: 20`), max `±15deg`. `onMouseLeave` resets to `{ rotateX: 0, rotateY: 0 }`
- Scroll-triggered stagger entrance: `useInView` trigger, `staggerChildren: 0.05s`, `{ y: 30, opacity: 0 } → { y: 0, opacity: 1 }`

### 4.3 Tech List (14 items)
TypeScript, JavaScript, React, Next.js, Node.js, CSS, HTML, PostgreSQL, MySQL, Supabase, Prisma, Tailwind CSS, Git, Azure

Icons sourced from `react-icons` (already installed): `SiTypescript`, `SiJavascript`, `SiReact`, `SiNextdotjs`, `SiNodedotjs`, `SiCss3`, `SiHtml5`, `SiPostgresql`, `SiMysql`, `SiSupabase`, `SiPrisma`, `SiTailwindcss`, `SiGit`, `SiMicrosoftazure`

### 4.4 Section Separator
A `60px`-tall `div` between the hero section and the tech stack section styled with:
```css
clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
background: linear-gradient(135deg, rgba(255,113,91,0.06), transparent);
```
This creates a subtle diagonal leading edge. Color: semi-transparent tomato gradient. No hard line — purely atmospheric.

---

## 5. About Section (`components/aboutMe.tsx`)

Full rewrite of layout. **The bio text, stat values (10+, 95%, 3+), and service labels are unchanged.**

### 5.1 Layout
Single two-column row on desktop. Column order is **intentionally changed** from the current layout:
- **Left column (`lg={6}`):** Bio + stats (currently on the right — now moved to the left)
- **Right column (`lg={6}`):** Services cards (currently on the left — now moved to the right)

Mobile: single column, bio first, stats row, then service cards stacked.

### 5.2 Bio + Stats (left column)
- Section code label: `"// about me"` in `#FF715B`, `font-size: 14px`, `letter-spacing: 0.15em`, `text-transform: uppercase`, rendered above the heading
- Heading `"About me"` — gradient fill: `background: linear-gradient(135deg, #FF715B 0%, #FCA311 100%)`, applied via `background-clip: text; -webkit-text-fill-color: transparent`
- Bio paragraph: word-by-word reveal on scroll (`useInView` + `staggerChildren: 0.015s`, `{ opacity: 0, y: 10 } → { opacity: 1, y: 0 }` per word span)
- **Mobile:** word-reveal simplifies to a single `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }` fade-up for the whole paragraph (no stagger) — prevents jank on low-power devices
- Stat counters: framer-motion `useInView` triggers a `useEffect` count-up from `0` to final value (`10`, `95`, `3`) over `1500ms` using `requestAnimationFrame` with ease-out. The `+` / `%` symbol is static, not animated.
- Stat card values **confirmed unchanged**: `10 +`, `95 %`, `3 +` with labels `Completed Projects`, `Client Satisfaction`, `Years of experience`
- Stat cards: keep existing hover lift + gain same 3D tilt as skill cards (`stiffness: 300, damping: 20`, max `±10deg`)

### 5.3 Services Cards (right column — replaces MUI Timeline)
Three equal-height glassmorphism cards stacked vertically with `gap: 16px`:
- Services: `Web Development`, `App Development`, `Cloud & Hosting`
- Each card: `backdropFilter: blur(16px)`, `background: rgba(26,45,58,0.8)`, `border: 1px solid rgba(255,113,91,0.15)`, `border-radius: 20px`, `padding: 28px`
- Inside: large icon at top (from `react-icons`, `48px`), `h6` title, `body2` one-liner description (added as static strings in the component)
- **Animated border trace on hover:** CSS SVG-border technique — an absolutely positioned `::before` pseudo-element with the same `border-radius` uses `clip-path` animation from `inset(0 100% 0 0)` → `inset(0 0 0 0)` on hover (`transition: 0.4s ease`), color `#FF715B`, `opacity: 0.6`
- Stagger entrance from right: `{ x: 60, opacity: 0 } → { x: 0, opacity: 1 }`, `staggerChildren: 0.12s`, triggered by `useInView`

---

## 6. Projects Section (`components/projects.tsx`)

**Constraint clarification:** Only the `data` array constant is protected and must not be modified. All layout, rendering, and import code in this file is within scope for redesign.

### 6.1 Filter Tabs
Pills: `All · Frontend · Full-Stack · Freelance`

**Category assignment** (hardcoded by `name` — the `data` array contains two entries with `id: 6` so `id` is NOT a unique key; match by `name` only):

| Project name | Category |
|---|---|
| `InkSmith Studios` | `Full-Stack` |
| `CVM Finance` | `Full-Stack` |
| `The Feast` | `Full-Stack` |
| `Enterprise SEO Blog Engine Demo` | `Frontend` |
| `Cash Management System` | `Full-Stack` |
| `Document Management System` | `Full-Stack` |
| `The little lemon restaurant` | `Frontend` |
| `Moshify` | `Frontend` |
| `Game-Hub` | `Frontend` |
| `My Portfolio` | `Full-Stack` |
| `Smart Bulletin Board` | `Freelance` |
| `Quiz App` | `Frontend` |

> **Duplicate ID warning:** Two separate entries in the `data` array share `id: 6` (`Enterprise SEO Blog Engine Demo` and `Quiz App`). Do NOT use `id` as a lookup key for categories — always match by `name`.

> Note: The Freelance tab will show exactly 1 project (Smart Bulletin Board). This is correct and intentional.

Add a `category` field to the `IData` interface (`'Frontend' | 'Full-Stack' | 'Freelance'`), and populate it in the `data` array using the mapping above. This is the only permitted change to the data array shape — values are not changed, only this new field is added.

Tab switch animation: framer-motion `AnimatePresence` with `mode="popLayout"` — outgoing cards `{ scale: 0.8, opacity: 0 }`, incoming cards stagger `{ y: 30, opacity: 0 } → { y: 0, opacity: 1 }`, `staggerChildren: 0.07s`.

### 6.2 Card Grid
- 3 columns desktop (`lg={4}`), 2 tablet (`md={6}`), 1 mobile (`xs={12}`)
- Card height: `380px`, `border-radius: 20px`, `overflow: hidden`, `position: relative`
- Thumbnail fills card as background image (`object-fit: cover`, `width: 100%`, `height: 100%`, `position: absolute`)
- Persistent overlay: `linear-gradient(to top, rgba(18,31,40,0.98) 40%, transparent)` — always visible
- Project name (`font-size: 22px`, `font-weight: 600`) + tech chips at bottom inside overlay

### 6.3 Card Hover
- Thumbnail: framer-motion `whileHover={{ scale: 1.08 }}`
- Description overlay: framer-motion `initial={{ y: '100%' }}` → `whileHover={{ y: 0 }}`, `transition: { duration: 0.3, ease: 'easeOut' }`, glassmorphism bg `rgba(18,31,40,0.92)` + `backdropFilter: blur(8px)`, shows description (3-line `WebkitLineClamp: 3`) + action buttons
- Border: framer-motion `whileHover={{ borderColor: 'rgba(255,113,91,0.5)', boxShadow: '0 20px 40px rgba(255,113,91,0.15)' }}`
- 3D tilt: same pattern as skill cards, max `±10deg`
- Magnetic effect on action buttons via `data-magnetic` attribute

### 6.4 Section Header
- Ghost number `"03"` (`aria-hidden="true"`) behind heading
- `"Projects"` heading: `font-size: { lg: 80, xs: 45 }`, kept as-is

### 6.5 Mobile
- Replace the `react-multi-carousel` Carousel with a native `overflow-x: scroll`, `scroll-snap-type: x mandatory` container
- Each card: `scroll-snap-align: start`, `min-width: 280px`, `flex-shrink: 0`
- Remove `import Carousel from 'react-multi-carousel'` from `projects.tsx`
- Remove `import 'react-multi-carousel/lib/styles.css'` from `pages/_app.tsx`
- `react-multi-carousel` can be removed from `package.json` dependencies

### 6.6 Entrance Animation
Scroll-triggered stagger via `useInView`, `staggerChildren: 0.07s`

---

## 7. Contact Section (`components/contact.tsx`)

**Constraint:** `handleSubmit`, `isValidEmail`, form field state, formbold POST endpoint, `toast.error`, `toast.success` — all **unchanged**. The confetti animation requires adding a `const [submitted, setSubmitted] = useState(false)` state flag and calling `setSubmitted(true)` inside the existing success block (after the `toast.success` call). This is the only permitted change to the function body.

### 7.1 Left Side (desktop layout)
Element order top to bottom:
1. Ghost number `"04"` (`aria-hidden="true"`) positioned behind heading
2. `"Contacts"` section label (kept)
3. `"Have a project?"` large heading (kept, word-reveal animation)
4. `"Let's talk!"` large heading (kept, word-reveal animation, slight delay)
5. Quick-contact chips row: `Email · LinkedIn · GitHub` pills with icons
   - Email: `mailto:charlescabarrus99@gmail.com`
   - LinkedIn: `https://www.linkedin.com/in/charles-rhobert-cabarrus-3201ba138/`
   - GitHub: `https://github.com/charles1211`
6. **The desktop Submit button is MOVED** from the left column into the form card (right column), at the bottom of the form — full-width. The left column no longer contains a Submit button.

### 7.2 Form Card (right column)
- Glassmorphism: `backdropFilter: blur(20px)`, `background: rgba(26,45,58,0.6)`, `border: 1px solid rgba(255,113,91,0.2)`, `border-radius: 20px`, inner top glow: `box-shadow: inset 0 1px 0 rgba(255,113,91,0.15)`
- Text fields: MUI `variant="outlined"` (replacing `variant="standard"`), custom focus ring: `fieldset` border animates from `rgba(255,255,255,0.2)` → `#FF715B` on focus via CSS transition
- Submit button: full-width, `background: linear-gradient(135deg, #FF715B 0%, #FCA311 100%)`, magnetic hover, existing disabled/loading/done states all kept exactly
- On success (`submitted === true`): framer-motion `AnimatePresence` renders 12 `motion.div` dots that `animate={{ x: random(-80,80), y: random(-80,80), opacity: [1,0], scale: [1, 0.5] }}` with `duration: 0.8s`, positioned absolutely relative to the button

### 7.3 Mobile
- Single column layout
- Submit button inside form card, full-width, at bottom (same as desktop)
- Quick-contact chips appear below the `"Let's talk!"` heading, before the form card

---

## 8. Footer (`components/footer.tsx`)

All content, social links, and click handlers — **unchanged**.

- Top border: replace `borderTop: '2px solid colors.tomato'` with an `::after` pseudo-element using `background: linear-gradient(90deg, #FF715B, #FCA311, #FF715B)`, `background-size: 200% 100%`, `@keyframes borderShift: { 0% { background-position: 0% } 100% { background-position: 200% } }`, `animation: borderShift 4s linear infinite`
- Social icons: CSS `::after` pseudo-element ripple on click — `transform: scale(0) → scale(2.5)`, `opacity: 1 → 0`, `duration: 0.5s`, triggered via `:active` state
- `ScrollToTopButton` from `common/scrollToTopButton.tsx` — **kept as-is**, no changes

---

## 9. Files Changed / Created

| File | Action | Notes |
|---|---|---|
| `components/MagneticCursor.tsx` | **Create** | New global cursor component |
| `components/Navbar.tsx` | **Create** | Replaces Header |
| `components/Header/Header.tsx` | **Delete / Remove import** | Old nav removed; import deleted from `_app.tsx` |
| `components/Header/HederStyle.ts` | **Delete** | Companion style file for removed Header |
| `pages/_app.tsx` | **Edit** | Add `MagneticCursor`, `Navbar`; remove old `Header` import; remove `react-multi-carousel/lib/styles.css` import |
| `pages/index.tsx` | **Edit** | Hero animations, delete marquee block, add tech stack grid section |
| `components/aboutMe.tsx` | **Edit** | Full layout redesign; column order swapped |
| `components/projects.tsx` | **Edit** | Card grid, filter tabs, mobile scroll-snap; `IData` interface gets optional `category` field |
| `components/contact.tsx` | **Edit** | Glassmorphism form, quick-contact chips, Submit button moved to form card |
| `components/footer.tsx` | **Edit** | Animated border, ripple icons |
| `styles/globals.css` | **Edit** | scroll-behavior, scrollbar, cursor:none toggle |
| `package.json` | **Edit** | Add `framer-motion@^10.18.0`; optionally remove `react-multi-carousel` |

---

## 10. Constraints (Do Not Touch)

| File / Item | Reason |
|---|---|
| `components/ColorBends.tsx` | Three.js dynamic import, works correctly |
| `components/projectsDialog.tsx` | Dialog logic unchanged |
| `common/scrollToTopButton.tsx` | Kept as-is |
| `hooks/` | All custom hooks unchanged |
| `utility/` | Emotion cache setup unchanged |
| `styles/theme/colors.ts` | Color palette unchanged |
| `handleSubmit` function body in `contact.tsx` | Adding `setSubmitted(true)` is the only permitted change |
| `isValidEmail`, form field state, formbold endpoint, toast calls | Completely unchanged |
| CV download logic (`handleDownload`, `dlState`) | Completely unchanged |
| `data` array in `projects.tsx` | Values unchanged; only `category` field is added to each entry |

---

## 11. Accessibility Notes

- All ghost numbers must carry `aria-hidden="true"`
- Magnetic cursor must be `aria-hidden="true"` and `pointer-events: none`
- Navbar must have `role="navigation"` and `aria-label="Main navigation"`
- Mobile menu overlay must trap focus when open and close on `Escape` key
- Scroll snap container on mobile must have `role="list"` with each card as `role="listitem"`
- Animated text reveals must respect `prefers-reduced-motion`: wrap all framer-motion variants with a `shouldReduceMotion` check — if true, use `{ opacity: 0 } → { opacity: 1 }` only (no y/scale transforms)
