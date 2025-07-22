# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Open Song Lyrics is a SvelteKit-based web application for searching Sinhala song lyrics. The app uses:
- **SvelteKit 5** with static adapter for deployment
- **IndexedDB** via `idb` for client-side data storage
- **Service Worker** for offline functionality
- **shadcn-svelte** components with Tailwind CSS
- **TypeScript** for type safety

## Development Commands

```bash
# Development server (with host binding)
pnpm dev

# Build for production
pnpm build

# Type checking and linting
pnpm check
pnpm lint
pnpm format

# Testing
pnpm test        # Run tests once
pnpm test:unit   # Run tests in watch mode

# Database (PostgreSQL via Docker)
pnpm db:start    # Start PostgreSQL container
pnpm db:push     # Push schema changes
pnpm db:migrate  # Run migrations
pnpm db:studio   # Open Drizzle Studio
```

## Architecture

### Data Flow
1. **Song Data**: Downloaded as JSON blob and stored in IndexedDB via `SongDao`
2. **State Management**: Svelte 5 runes in `src/state/songs.svelte.ts`
3. **Offline Support**: Service worker caches app shell and API responses

### Key Components
- **SongDownloader**: Handles initial song data download and IndexedDB storage
- **SongSearch**: Main search interface with real-time filtering
- **Song Popup/Card**: Display song lyrics and metadata
- **Service Worker**: Provides offline capability with cache-first strategy

### Database Layer
- **IndexedDB**: Client-side storage using `idb` wrapper
- **SongDao**: Data access layer for song operations
- **PostgreSQL**: Development database (Docker) for potential server features

### Component Structure
- UI components follow shadcn-svelte patterns
- Components are organized in `src/lib/components/ui/`
- Each component has its own folder with index.ts export
- Uses bits-ui as the base component library

## Testing

Uses Vitest for unit testing with test files in `src/**/*.{test,spec}.{js,ts}` pattern.

## Build Configuration

- **Static Adapter**: Configured for static site generation
- **Tailwind**: Version 4 with custom config
- **Vite**: Standard SvelteKit Vite setup with Vitest integration
- **Service Worker**: Registered for offline functionality