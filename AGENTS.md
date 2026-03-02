# Agent Startup Instructions

## Read Order (Mandatory)

Before planning or writing code, read files in this exact order:
1. `ARCHITECTURE.md`
2. `STEERING.md`
3. `CONVERSATION_LOG.md` (read only the most recent 5 sessions)

## Conversation Log Scope Rule

When reading `CONVERSATION_LOG.md`:
- Include only the latest 5 sessions.
- Skip all older sessions.
- Use older sessions only if the user explicitly asks for historical context.

## Core Working Rules

1. Follow existing repo patterns before introducing new ones.
2. Respect MVVM boundaries:
   - View: UI/presentation
   - ViewModel: state/orchestration/form logic
   - services/store/api: data access and shared state
3. Prefer reuse over creating parallel components/hooks/services.
4. Keep changes scoped to the requested task.
5. Use strict TypeScript patterns and avoid `any` unless unavoidable and documented.
6. Handle loading, error, and empty states for data-driven UI.
7. Do not hardcode config that should be in env/config.
8. Do not leave debug logs in final code.

## Data and API Rules

- Keep API/Supabase logic out of view components.
- Reuse existing services/hooks/selectors where possible.
- Follow the existing async style used in the area (thunks vs RTK Query, etc.).

## Styling Rules

- Use existing design system/tokens and established Tailwind patterns.
- Reuse shared UI primitives before creating new components.

## Definition of Done

A change is done only if it compiles/typechecks, matches repo conventions, handles core UI states, and avoids unnecessary duplication.

## Source of Truth

If any instruction conflicts, follow in this order:
1. `ARCHITECTURE.md`
2. `STEERING.md`
3. Most recent 5 sessions in `CONVERSATION_LOG.md`
