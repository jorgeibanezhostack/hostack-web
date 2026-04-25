# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # local dev server (Vite, port 5173)
npm run build        # production build → dist/
npm run lint         # ESLint
npm run db:migrate   # apply supabase/schema.sql via Management API (needs SUPABASE_ACCESS_TOKEN)
npm run db:create-admin  # create/update Supabase Auth admin user
```

No test suite exists yet.

## Architecture

**Two separate apps in one repo:**

1. **Marketing site** — `/` — React 19 SPA, all inline styles, no CSS framework
2. **Command Center** — `/command-center` — protected internal dashboard, same stack

### Routing

`src/main.jsx` wraps the app in `<BrowserRouter>`. `src/App.jsx` owns all routes and global CSS (injected via `<style>` tag — this must stay at the top level above `<Routes>` so it applies everywhere). `ProtectedRoute` gates `/command-center` behind Supabase Auth session.

### Design system

All design tokens live in `src/data/tokens.js`: `COLORS`, `FONTS`, `TYPOGRAPHY`, `CONTENT`.  
Landing page copy is also in `CONTENT` — edit there, not in components.

Dark theme palette used in the Command Center:
- bg `#040f11` / surface `#071820` / card `#0a2029` / accent `#4af8d4`

**No CSS classes for layout.** Everything is inline `style={{}}` objects. The one exception is `.glass-card` defined in the global `<style>` tag in `App.jsx`.

**Icons:** `src/components/dashboard/Icon.jsx` — brand SVG icons, 1.5px stroke, `strokeLinecap="round"`, `strokeLinejoin="round"`, 16×16 viewBox. Add new icons here; never use emoji as UI elements.

### Landing page

`src/components/LandingLayout.jsx` renders the full marketing site. Section components (`Nav`, `Hero`, `Product`, `Problem`, `Results`, `Pricing`, `FoundingMember`, `Footer`, `WaitlistModal`) are in `src/components/`. Each is self-contained.

### Command Center

`src/pages/CommandCenter.jsx` — layout: sticky TopBar (52px) + two-column body (ClientTable flex:1, sidebar 340px with TaskPanel + ActivityFeed). Mobile collapses to single column.

**Hooks:**
- `src/hooks/useAuth.js` — Supabase session, `signIn`, `signOut`
- `src/hooks/useClients.js` — fetches `/api/command-center/clients`, subscribes Realtime channel `command-center:service_states` to patch local state on service toggle without full reload
- `src/hooks/useTasks.js` — fetches `/api/command-center/tasks`, Realtime channel `command-center:task_queue`
- `src/components/dashboard/ActivityFeed.jsx` — owns its own fetch + Realtime channel `command-center:activity_log`

### API routes (Vercel Serverless)

All under `api/` — ES modules, same pattern: OPTIONS preflight → auth check → DB op.

| Route | Auth | Methods |
|---|---|---|
| `api/command-center/clients.js` | Bearer JWT | GET, POST |
| `api/command-center/service-states.js` | Bearer JWT | GET, PATCH |
| `api/command-center/tasks.js` | Bearer JWT **or** `x-api-key` | GET, POST, PATCH |
| `api/command-center/activity.js` | Bearer JWT | GET |
| `api/waitlist-signup.js`, `subscribe.js`, `register-free.js` | none | POST |

**Agentic bridge** — external agents interact with `tasks.js` using `x-api-key: <COMMAND_CENTER_API_KEY>` header. They `GET ?status=pending` to claim work and `PATCH {id, status, result, assigned_agent}` to report back. Activity log records `actor: "agent"` automatically.

API routes use `process.env.SUPABASE_URL` + `process.env.SUPABASE_SERVICE_ROLE_KEY` (server-side, no VITE_ prefix). Browser client (`src/lib/supabase.js`) uses `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.

### Database (Supabase — project `yskzkobduekupiobrbxr`)

Schema in `supabase/schema.sql`. Four tables, RLS disabled (auth enforced at API layer):

- `clients` — one row per hostel/coliving property
- `service_states` — one row per (client × service), services: `guest_app | staff_app | owner_dashboard`
- `task_queue` — agentic task queue; statuses: `pending → in_progress → completed | failed`
- `activity_log` — append-only audit trail, actor: `human | agent`

Realtime must be enabled on `service_states`, `task_queue`, `activity_log` in Supabase dashboard → Database → Replication for live UI updates to work.

### Deployment

Push to `main` → Vercel auto-deploys to `www.hostack.co` and `hostack-web.vercel.app`.  
Vercel project: `hostack-web` under `jorgeibanezciej-1200s-projects`.

### Env vars

`.env` for local dev (gitignored). Same vars must be set in Vercel dashboard for production.

```
VITE_SUPABASE_URL          # browser client
VITE_SUPABASE_ANON_KEY     # browser client
SUPABASE_URL               # API routes (server)
SUPABASE_SERVICE_ROLE_KEY  # API routes (server)
COMMAND_CENTER_API_KEY     # agentic bridge auth (cc-hostack-2026-agent-bridge)
RESEND_API_KEY             # email (waitlist, subscribe)
```

Admin user: `hello@hostack.co` — manage via Supabase dashboard → Authentication → Users.

### Pending cleanup

- Delete stale branches on GitHub manually (proxy blocks `--delete` from this environment):
  - `claude/hostack-landing-redesign-6ToMK`
  - `claude/install-cyber-neo-skill-on6UC`
  - `claude/hostack-command-center-EQ6ch` (merged)
- Delete or redeploy the old `hostack` Vercel project (shows stale content at `hostack.vercel.app`)
- Update GitHub repo "About" URL from `hostack.vercel.app` → `www.hostack.co`
