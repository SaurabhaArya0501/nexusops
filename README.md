# NexusOps

Enterprise operations platform built with modern Angular (Signals,
zoneless change detection, hybrid rendering). Built in public as
an architecture deep-dive.

![Loading skeletons, refresh without blanking, failed refresh with stale data, and empty and not-found states](docs/screenshots/async-states.gif)

## Status

🚧 Shell, navigation, ticket list, dashboard, and ticket detail are live, all backed by a signal-based state layer fed by HTTP. Data arrives through a dev-only mock backend; auth and a real API are next.

## Architecture so far

- Standalone components throughout, bootstrapped via `bootstrapApplication`
- Application shell (header, sidebar, content) with lazy-loaded feature routes
- Signal-based `TicketStore`: private writable state, read-only queries, and named commands — no component owns ticket data directly
- Ticket list, dashboard, and ticket detail (`/tickets/:id`, via signal-input route params) all read from the same store
- Filtering, text search, and sorting composed from signals into derived (`computed`) view state
- Fully responsive (mobile-first, 768px breakpoint)
- Design token system (CSS custom properties) for color, spacing, typography, and elevation
- Self-hosted Roboto typeface

<pre>shell (header + sidebar)
   │
   └── lazy feature routes
          │
          ├── /tickets        ─┐
          ├── /tickets/:id    ─┤ read signals, call commands
          └── /dashboard      ─┘
                                 │
                                 ▼
                          TicketStore
                    (private state · public
                     queries · named commands)
                                 │
                                 ▼
                          domain types
                    (branded ids, discriminated
                       unions, exhaustiveness)
</pre>

## State management

- Signal-based stores, no external state library — served entirely by Angular's own primitives
- Command–query shape: private writable signals, read-only queries (`asReadonly()` / `computed`), state changes only through named commands
- Nothing is duplicated: any value calculable from existing state (counts, the filtered/sorted list) is a `computed`, never a second stored copy
- `linkedSignal` for state that's user-writable but resets on an upstream change — e.g. sort order resetting when the status filter changes
- `effect()` reserved for side effects leaving the reactive world (persisting UI state, updating the document title) — never for deriving state

## Data loading

- `httpResource` for all reads — one resource per thing fetched, never one per component
- Wire types (`TicketDto`) are separate from domain types (`Ticket`); a single mapper converts at the boundary, so `Date`s and branded ids exist everywhere inside the app
- Dev-only mock backend implemented as an `HttpInterceptorFn`, switchable at runtime to return errors, empty results, or slow responses — the app code only ever sees real URLs and status codes
- Four states rendered explicitly everywhere: loading, error, empty, data — with "no results" and "no matching results" treated as different states
- Skeletons mirror the real layout's grid, so content arriving causes no layout shift
- Ticket detail fetches by route id through a reactive URL, so deep links work cold and in-flight requests are cancelled when the id changes
- Last successfully loaded data is retained via `linkedSignal`, so a failed refresh shows a banner over usable data instead of blanking the page
- HTTP errors are mapped to user-facing messages in one place; 404s render as "not found" content rather than a retryable error

## Planned architecture

Auth + RBAC · Admin portal ·
Dynamic forms · SSR/hybrid rendering · AI copilot · Full test coverage · Docker + CI/CD

## Stack

Angular 22 · TypeScript (strict) · ESLint · Prettier

## Setup

npm install && npm start

## Conventions

- Conventional Commits
- Trunk-based branching, PRs into `main`
