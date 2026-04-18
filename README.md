# Ashvin Jangid — Portfolio

Personal portfolio for **Ashvin Jangid**, a backend-focused full-stack developer.

**Aesthetic direction:** Editorial blueprint × technical brutalism.
Cream paper + ink palette, a single hot-amber accent, distinctive serif
display pairing (`Instrument Serif` + `JetBrains Mono`), custom cursor,
blueprint grid, grain overlay, and a live 3D hero rendered with three.js.

## Stack

- **React 19** + **TypeScript** + **Vite 8** (with React Compiler)
- **three.js** + **@react-three/fiber** + **@react-three/drei** — 3D hero
  scene with a dark obsidian icosahedron, amber wireframe edges, orbiting
  geometric primitives and mouse-parallax rig
- **motion** — animation primitives (reserved, currently CSS-driven)
- Google Fonts: `Instrument Serif`, `Instrument Sans`, `JetBrains Mono`

## Sections

1. **Hero** — Name, headline, status, and the 3D obsidian/amber core.
2. **Marquee** — Rolling tech stack ticker on ink background.
3. **Manifesto** — Editorial prose on backend-focused engineering.
4. **Stack** — Grid of skill clusters.
5. **Work** — Featured projects, each with its own 3D primitive.
6. **Record** — Education timeline.
7. **Contact** — Mail, phone, GitHub, LinkedIn.

## Data

Content is sourced from `resume.json` (Reactive Resume schema). Parsing and
typing happens in `src/data/resume.ts`.

## Scripts

```bash
bun install       # install deps
bun run dev       # dev server
bun run build     # production build
bun run preview   # preview built output
```

## Structure

```
src/
├── App.tsx              # Top-level layout + scroll reveal observer
├── main.tsx
├── index.css            # Design tokens + every section style
├── components/
│   ├── Nav.tsx          # Sticky glass nav with live IST clock
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── Summary.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Cursor.tsx       # Custom cursor with inertial ring
│   └── Clock.tsx
├── three/
│   ├── Hero3D.tsx       # Obsidian icosahedron + amber orbiters
│   └── ProjectShape.tsx # Per-project geometric primitive (lazy-mounted)
└── data/
    └── resume.ts        # Typed derivation of resume.json
```
