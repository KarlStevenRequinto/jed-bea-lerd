# Project Architecture Guide

This document outlines the architectural patterns and conventions used in this project. Follow these guidelines when creating new components and features.

## Component Architecture

### Component Structure

All components should follow this folder-based structure:

```
ComponentName/
├── index.tsx              # Component UI and JSX
└── useViewModel.ts        # Business logic, state, and hooks
```

**Key Principles:**
- **Folder name = Component name**: Use PascalCase (e.g., `LoginForm`, `ProductCard`)
- **Separation of concerns**: Keep UI in `index.tsx`, logic in `useViewModel.ts`
- **Single export**: Each component folder exports only the component via `index.tsx`

### File Naming Conventions

- **Component files**: `index.tsx` (always)
- **ViewModel files**: `useViewModel.ts` (always)
- **Hook naming**: Export hook as `use[ComponentName]ViewModel`

### Example: Creating a New Component

#### 1. Create folder structure
```bash
mkdir -p src/components/ProductCard
```

#### 2. Create `useViewModel.ts`
```typescript
// src/components/ProductCard/useViewModel.ts
import { useState } from "react";

export const useProductCardViewModel = () => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    return {
        isLiked,
        handleLike,
    };
};
```

#### 3. Create `index.tsx`
```typescript
// src/components/ProductCard/index.tsx
"use client"; // Add if using hooks or client-side logic

import { useProductCardViewModel } from "./useViewModel";

const ProductCard = () => {
    const { isLiked, handleLike } = useProductCardViewModel();

    return (
        <div>
            <button onClick={handleLike}>
                {isLiked ? "❤️" : "🤍"}
            </button>
        </div>
    );
};

export default ProductCard;
```

#### 4. Import and use
```typescript
import ProductCard from "@/components/ProductCard";
```

## Directory Structure

### Next.js Folder Conventions

Next.js uses special folder naming conventions:

- **`_foldername`** - Private folders, excluded from routing (use for route-specific components)
- **`(groupname)`** - Route groups, excluded from routing but organize related routes
- **`foldername`** - Regular folders, included in URL routing

### Global Components
Location: `src/components/`

Used for reusable components across the entire application.

```
src/components/
├── common/              # Generic reusable components
│   ├── Button/
│   ├── IconBadge/
│   └── ...
├── forms/               # Form-related components
│   ├── BaseButton/
│   ├── AuthInput/
│   └── ...
├── navigation/          # Navigation components
│   ├── Navbar/
│   └── ...
└── svg-icons/          # SVG icon components
    ├── google/
    ├── facebook/
    └── ...
```

### Route-Specific Components
Location: `src/app/(route-group)/_components/`

Used for components specific to a route or feature.

**Important**: Use underscore prefix (`_components`) to mark as private folder excluded from Next.js routing.

```
src/app/(auth)/
├── _components/         # Private folder: Auth-specific components
│   ├── LoginForm/
│   │   ├── index.tsx
│   │   └── useViewModel.ts
│   ├── RegisterForm/
│   │   ├── index.tsx
│   │   └── useViewModel.ts
│   └── ...
└── login/
    └── page.tsx
```

## Component Categories

### 1. Base/Primitive Components
**Location**: `src/components/common/` or `src/components/forms/`

Highly reusable, no business logic, fully customizable via props.

**Examples**: `BaseButton`, `AuthInput`, `IconBadge`

```typescript
// BaseButton example
interface BaseButtonProps {
    children: ReactNode;
    leftIcon?: ReactNode;
    className?: string;
    // Extend native HTML props
}
```

### 2. Feature Components
**Location**: `src/app/(route-group)/_components/` or `src/components/`

Contains business logic, specific to a feature or page.

**Examples**: `LoginForm`, `RegisterForm`, `ProductCard`

**Note**: Use `_components` folder for route-specific components to exclude from routing.

### 3. Page Components
**Location**: `src/app/(route-group)/page.tsx`

Top-level route components, orchestrate feature components.

## Styling Guidelines

### Tailwind CSS Classes
- Use Tailwind utility classes for styling
- Create consistent default styles in base components
- Allow customization via `className` prop
- Use CSS variables for theme values: `var(--color-brand)`

### Example
```typescript
const defaultClasses = "flex items-center justify-center gap-2 rounded-md px-4 py-2";

<button className={`${defaultClasses} ${className}`}>
```

## State Management

### Client-Side State
- Use `useViewModel.ts` for component-specific state
- Use React hooks (`useState`, `useEffect`, etc.)

### Global State
- Use Redux Toolkit (`@/store`)
- Import hooks: `useAppDispatch`, `useAppSelector`

## Import Aliases

Use path aliases for cleaner imports:

```typescript
import Component from "@/components/Component";
import { login } from "@/store/authSlice";
import logo from "@/assets/images/logo.png";
```

## Best Practices

### ✅ DO
- Separate UI from business logic
- Use TypeScript for type safety
- Follow the folder structure consistently
- Use meaningful, descriptive names
- Export default from `index.tsx`
- Use `"use client"` directive when using React hooks
- Use `_components` for route-specific component folders to exclude from routing

### ❌ DON'T
- Mix UI and business logic in the same file
- Create components directly as single files for complex features
- Skip TypeScript types
- Use inconsistent naming conventions
- Export multiple components from one folder

## Quick Reference

When creating a new component, ask yourself:

1. **Is it reusable across the app?** → `src/components/common/` or `src/components/forms/`
2. **Is it specific to a route/feature?** → `src/app/(route-group)/_components/`
3. **Does it have business logic?** → Create `useViewModel.ts`
4. **Does it use React hooks?** → Add `"use client"` directive

**Remember**: Always use `_components` (with underscore) for route-specific component folders!

---

**Last Updated**: 2025-10-28
