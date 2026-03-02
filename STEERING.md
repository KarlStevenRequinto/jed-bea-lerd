# STEERING.md

## AI Steering Document - Senior Full-Stack Standards

Tech stack: Next.js, TypeScript, Tailwind CSS, Supabase, Redux Toolkit, React Hook Form
Architecture preference: MVVM-style (View + ViewModel + services/data)
Goal: Produce consistent, maintainable, production-quality code by matching existing patterns and reusing components/utilities.

---

## 0 - Prime Directive

1. Match the existing codebase first.
2. Prefer reuse over invention.
3. Keep changes small and scoped to the task.
4. Type safety is non-negotiable.
5. Consistency beats personal preference.

Before creating anything new, search for existing patterns, components, hooks, utilities, types, slices, services, and folder conventions.

---

## 1 - Required Workflow (Every Task)

### Step A - Codebase Discovery

Before coding, quickly inspect:

- Folder structure conventions (pages/features/components/services/store/types)
- Redux setup (store, slice pattern, thunks vs RTK Query)
- Supabase usage (client/server helpers, auth/session patterns)
- Form patterns (RHF, schema validation usage)
- Existing UI primitives (Button, Input, Modal, Table, banners, skeletons)
- Existing MVVM conventions (file names, VM responsibilities, what View receives)

### Step B - Short Plan

Write a brief implementation plan:

- Files to modify/create
- Existing modules to reuse
- New modules required (only if necessary)
- Data flow: `View -> ViewModel -> service/store -> Supabase/API -> ViewModel -> View`

### Step C - Implementation

- Follow repo lint/format/typecheck conventions.
- Add or refine TypeScript types.
- Keep logic in the right layer (View vs ViewModel vs service/store).
- Add tests only when aligned with existing repo testing patterns, unless explicitly requested.

### Step D - Self-Check

Verify before finalizing:

- No dead code or unused exports
- No duplicate component introduced unnecessarily
- Loading/error/empty states are handled
- Naming and placement are consistent with the codebase

---

## 2 - Architecture Rules (MVVM for Next.js)

### View (UI)

- React components should be mostly presentational.
- Focus on layout/rendering and simple prop wiring.
- Do not place business/data orchestration logic in JSX if a ViewModel pattern exists.

### ViewModel

Use `useViewModel.ts(x)` or the local equivalent for:

- UI state (loading flags, toggles)
- Form setup and submit handlers
- Derived/computed values
- Orchestration (service calls and/or Redux dispatch)

Return only what the View needs.

### Model/Data Layer

- `services/*` for Supabase/API access
- `store/*` for slices/selectors/thunks or RTK Query
- `types/*` for shared domain and transport types

Rules:

- Views must not call Supabase directly.
- Supabase/API calls belong in services or established data layer.
- If multiple valid styles exist, use the style already used in that area.

---

## 3 - Frontend-Backend Flow

1. Look for an existing API/service/hook first.
2. Keep network logic out of UI components.
3. If creating a new call, place it in the established layer and type request/response.
4. Keep service boundaries explicit with DTO/input/output types.

---

## 4 - State Management Rules (Redux Toolkit)

Use Redux for shared cross-page state or existing global concerns. Use local/component state for ephemeral UI and form-local behavior.

Rules:

- Prefer selectors instead of repeated deep state access.
- Prefer `createSlice` patterns already in the repo.
- For async, follow existing convention (thunks or RTK Query); do not introduce a competing style.
- Do not dispatch in render.
- Do not store derived state when selectors/memoization are sufficient.

---

## 5 - Forms Rules (React Hook Form)

- Initialize forms in the ViewModel.
- Use `FormProvider` when nested fields need shared form context.
- Use schema validation (zod/yup) if already present; otherwise use RHF rules consistently.
- Always handle:
  - Disabled submit while loading
  - Server errors mapped to form errors or friendly UI feedback
  - Default values from fetched data via `reset()`

---

## 6 - Styling and UI Rules (Tailwind + Design System)

- Use global design system/theme tokens for colors, typography, spacing.
- Do not hardcode colors/fonts if tokens/utilities exist.
- Maintain layout and responsive patterns used elsewhere.
- Reuse existing primitives before creating new components.

Component guidance:

- Keep components focused and reasonably sized.
- Prefer composition and variants over flag-heavy APIs.
- Use existing helpers (for example `cn()`) when available.

---

## 7 - Error Handling, Validation, and UX

Always account for:

- Loading state
- Error state
- Empty state

Requirements:

- Surface user-friendly messages, not raw backend internals.
- Handle Supabase/API errors explicitly.
- Prefer non-blocking UX feedback where possible.

---

## 8 - TypeScript Standards

- Avoid `any`; if unavoidable, isolate and document the reason.
- Prefer explicit return types for exported functions.
- Prefer clear domain/input/output types at boundaries.
- Keep types close to usage unless shared broadly.

---

## 9 - Reuse-First Checklist (Before Adding New Code)

1. Is there already a reusable component/hook/service for this?
2. Can existing components be extended safely via variants/props?
3. Is there an existing EmptyState/Loading/Error pattern to reuse?
4. Is there an existing utility for class merging, formatting, parsing, validation?
5. Are design tokens/classes already available for this styling?

If yes, reuse/extend. Create new only when genuinely necessary.

---

## 10 - Prohibited or Discouraged Patterns

Do not:

- Ignore MVVM boundaries.
- Introduce new state management libraries or conflicting patterns without explicit request.
- Hardcode config that belongs in env/config files.
- Leave `console.log` statements in final code.
- Perform unrelated refactors outside scope.
- Over-engineer abstractions for simple tasks.

---

## 11 - Suggested Feature Layout (Template)

- `src/features/<feature>/view/index.tsx` (View)
- `src/features/<feature>/view/useViewModel.ts` (ViewModel)
- `src/features/<feature>/services/<feature>Service.ts` (Data access)
- `src/features/<feature>/store/<feature>Slice.ts` (Optional Redux state)

Use this only if it matches existing repo conventions; otherwise mirror the local pattern.

---

## 12 - Definition of Done

A task is complete only when:

1. Code compiles and typechecks.
2. Behavior is aligned with existing repo patterns.
3. Loading/error/empty states are handled.
4. No unnecessary duplication was introduced.
5. Changes are scoped, readable, and maintainable.

---

## 13 - AI Response Expectations (When Asked for Code)

When delivering changes:

1. List files changed/created.
2. Include complete, paste-ready snippets (with imports) when sharing code in chat.
3. State key assumptions only when needed.
4. Briefly explain how the change follows MVVM and existing project conventions.

If uncertain:

- Inspect surrounding code and imitate it.
- Choose the simplest safe approach consistent with the repo.
