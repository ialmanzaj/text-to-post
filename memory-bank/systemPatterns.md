# System Patterns

## System Architecture
- Single-page React application (SPA) with functional components.
- All logic and rendering handled client-side; no backend required for core features.

## Key Technical Decisions
- Use of React and TypeScript for type safety and maintainability.
- Use of `html2canvas` for DOM-to-image export functionality.
- Responsive design with Tailwind CSS for rapid UI development.

## Design Patterns in Use
- Component-based UI structure.
- State management via React hooks (`useState`, `useRef`).
- Separation of concerns: parsing, rendering, and export logic are modularized.

## Component Relationships
- `TextImageGenerator` is the main component, handling all user input, preview, and export logic.
- Utility functions (e.g., content parsing) are encapsulated within the main component for now, but can be refactored into helpers as the app grows. 