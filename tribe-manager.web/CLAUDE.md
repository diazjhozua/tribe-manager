# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a **React 19** frontend application built with **Vite** and **TypeScript**. It serves as the web interface for the tribe-manager system, providing user authentication, landing page, and legal compliance pages.

### Technology Stack
- **React 19.1.1** with TypeScript
- **Vite 7.1.6** for build tooling and dev server
- **Chakra UI 3.28.0** for component library and design system
- **React Router DOM 7.9.4** for client-side routing
- **ESLint** with strict TypeScript configuration and stylistic rules

### Project Structure
```
tribe-manager.web/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components and providers
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   └── sections/     # Page sections (Hero, About, Team, CTA)
│   ├── pages/           # Route components
│   ├── assets/          # Static assets
│   └── main.tsx         # Application entry point
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript project references
├── tsconfig.app.json    # App-specific TypeScript config
└── package.json         # Dependencies and scripts
```

## Development Commands

### Core Development
```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### TypeScript
```bash
# Type checking
tsc --noEmit

# Type checking with project references
tsc -b

# Build TypeScript (included in npm run build)
tsc -b && vite build
```

## Architecture Patterns

### Component Organization
- **Pages**: Route-level components in `src/pages/`
- **Layout**: Shared layout components (Header, Footer) in `src/components/layout/`
- **Sections**: Reusable page sections in `src/components/sections/`
- **UI Components**: Generic reusable components in `src/components/ui/`

### Path Aliases
Uses `@/*` alias for `src/*` via `vite-tsconfig-paths` plugin:
```typescript
import { FormInput } from '@/components/ui/FormInput';
import { Header } from '@/components/layout/Header';
```

### Chakra UI Integration
- **Provider Setup**: Custom Provider component wrapping ChakraProvider with ColorModeProvider
- **Component Pattern**: Uses Chakra UI components with consistent styling patterns
- **Theme**: Built-in dark/light mode support via `next-themes` integration

### Form Components
Standardized form input pattern with consistent styling:
- `FormInput` component with label, validation, and focus states
- `PasswordToggle` component for password visibility
- Consistent green accent color theme (`green.400`, `green.300`)

## Code Style and Linting

### ESLint Configuration
- **Strict TypeScript**: Uses `recommendedTypeChecked`, `strictTypeChecked`, `stylisticTypeChecked`
- **Stylistic Rules**: Airbnb-like formatting with specific preferences:
  - 2-space indentation
  - Single quotes for strings, double quotes for JSX
  - Always trailing commas in multiline
  - Strict spacing and formatting rules

### Special Lint Rules
- UI components in `src/components/ui/` have relaxed rules:
  - `@typescript-eslint/no-empty-object-type` disabled
  - `react-refresh/only-export-components` disabled

## Application Structure

### Routing
Uses React Router with simple route structure:
- `/` - Home page (landing)
- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password reset
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/cookies` - Cookie policy

### Provider Hierarchy
```tsx
<StrictMode>
  <Provider>          // Chakra UI + Color Mode
    <BrowserRouter>   // React Router
      <App />         // Route definitions
    </BrowserRouter>
  </Provider>
</StrictMode>
```

### Component Index Files
Uses barrel exports for clean imports:
- `src/components/index.ts` - Main component exports
- `src/components/ui/index.ts` - UI component exports
- `src/components/layout/index.ts` - Layout component exports
- `src/components/sections/index.ts` - Section component exports

## Development Guidelines

### Adding New Components
1. Create component file in appropriate directory
2. Follow TypeScript interface pattern for props
3. Use Chakra UI components and design tokens
4. Add to relevant index.ts barrel export
5. Follow ESLint styling rules (run `npm run lint`)

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route to `App.tsx`
3. Follow existing layout pattern (using Header/Footer if needed)

### TypeScript Configuration
- **Strict Mode**: All strict TypeScript options enabled
- **Path Mapping**: `@/*` alias for src imports
- **Project References**: Split config for app and node code
- **Build Optimization**: Uses `verbatimModuleSyntax` and `noEmit` for Vite integration

## Integration Notes

This frontend is designed to integrate with the tribe-manager.api .NET backend. The authentication forms (Login, Register, ForgotPassword) are prepared for API integration but currently only contain UI implementation.