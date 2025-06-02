# NextDash 🖥️✨

Beautiful **static** dashboard template powered by **Next.js 14**, **TypeScript**, **Tailwind CSS** and the amazing **[shadcn/ui](https://ui.shadcn.com)** component library.

> Ready-to-ship starter for SaaS admin panels, analytics portals, internal tools and any data-driven web app.

---

## ✨ Key Features

| Category | Highlights |
|----------|------------|
| UI & UX  | Shadcn UI + Radix primitives, dark / light theme toggle, adaptive layout, accessible components |
| Dashboards | Stat cards, line / bar / area / pie charts (Recharts), activity feed, traffic sources, top lists |
| Productivity | Quick actions panel, notifications & toast system, search field, drill-down navigation |
| Data Handling | Mock data + utilities (`formatCurrency`, `formatNumber`, debounce, etc.) ready for API integration |
| Performance | **Static Site Generation** (`next export`), SWC-based minification, code-splitting, zero runtime overhead on CDN |
| DX | Typed with **TypeScript**, strict ESLint + Prettier + Tailwind plugins, alias paths (`@/`), fully componentised |

---

## 🏗️ Tech Stack

- **Next.js 14** (App Router disabled ‑ traditional Pages dir for full static export)
- **TypeScript**
- **Tailwind CSS** + `tailwind-merge`, `tailwindcss-animate`
- **shadcn/ui** (Radix UI under the hood)
- **Recharts** – data visualisation
- **lucide-react** – icon set
- **date-fns** – date helpers
- **class-variance-authority** – variant-driven styling

---

## 📂 Project Structure (simplified)

```
.
├── src
│   ├── components      # Reusable UI + dashboard widgets
│   ├── pages           # Next.js pages (SPA-like routing)
│   ├── styles          # Global Tailwind sheet
│   └── lib             # Utility helpers
├── public              # Static assets (favicon, images …)
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

> Feel free to adjust aliases in `tsconfig.json` / `tailwind.config.js` for your own folder conventions.

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js **18 LTS** or later  
- pnpm / npm / yarn (examples use **pnpm**)

### 2. Installation

```bash
git clone https://github.com/your-username/nextdash.git
cd nextdash
pnpm install        # or npm install / yarn
```

### 3. Development

```bash
pnpm dev            # starts localhost:3000 with HMR
```

Open `http://localhost:3000` to view the dashboard.

### 4. Production Build

```bash
# transpile & optimise
pnpm build
# preview production server
pnpm start
```

### 5. Static Export 🌐

```bash
pnpm export         # outputs static files to /out
```

Upload the generated **out** folder to **GitHub Pages**, **Netlify Drop**, **Cloudflare Pages**, **S3** or any static hosting provider.

---

## 🛠️ Customisation Guide

1. **Branding** – swap logo / favicon in `public/`, update colours in `tailwind.config.js` CSS variables.
2. **Navigation** – edit `navItems` array in `src/components/layout/dashboard-layout.tsx`.
3. **Widgets** – replace mock data in `src/pages/dashboard/*.tsx` with real API calls (fetch inside `getStaticProps` / `getServerSideProps` or client hooks).
4. **Theme** – extend Tailwind design tokens or add new variants via **CVA**.
5. **Deployment** – one-click deploy to **Vercel** for optimal Next.js edge hosting.

---

## 🧪 Scripts

| Script            | Purpose                                   |
|-------------------|-------------------------------------------|
| `pnpm dev`        | Run dev server with hot reload            |
| `pnpm build`      | Production build                          |
| `pnpm start`      | Serve built app                           |
| `pnpm export`     | Static export to `/out`                   |
| `pnpm lint`       | ESLint + TypeScript checks                |

---

## 🤝 Contributing

PRs and issues are welcome!  
Follow the existing code style (Prettier + Tailwind plugin) and include unit / integration tests where applicable.

---

## 📄 License

This template is released under the **MIT License**.  
It bundles third-party OSS with their respective licenses (Radix UI, shadcn/ui, Tailwind CSS, Recharts, etc.).

---

### Credits

Big thanks to:

- [@shadcn](https://twitter.com/shadcn) for the phenomenal UI kit  
- [Vercel](https://vercel.com) & Next.js team  
- Radix UI, Tailwind CSS, Lucide, Recharts and all open-source contributors!
