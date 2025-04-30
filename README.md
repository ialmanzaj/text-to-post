# Text-to-Post Generator

A web-based tool for turning your text content into visually appealing social media images. Designed for creators and marketers who want a fast, flexible, and user-friendly way to generate post images for platforms like Instagram, LinkedIn, and Twitter.

## Features
- Input, format, and preview text content for social media posts
- Export formatted content as high-resolution images in multiple aspect ratios
- User-friendly interface for editing, previewing, and exporting
- Responsive design for desktop and mobile
- Extensible architecture for future themes and templates

## Why Use This Tool?
Manual design of text posts is time-consuming and inconsistent. This app streamlines the process, allowing you to:
- Quickly turn text into images with clear visual structure
- Preview posts in real time
- Export for multiple social media requirements

## How It Works
1. Paste or type your content (supports section titles and bullet points)
2. The app formats your content into a visually appealing layout
3. Preview your post in a mobile frame
4. Export as a high-resolution image in your chosen aspect ratio

## Tech Stack
- **React** (with TypeScript) for UI and logic
- **Tailwind CSS** for styling
- **html2canvas** for DOM-to-image export
- **Lucide React** for icons
- **Vite** for fast development and build

## Project Structure
- All source code in `src/`
- Main component: `src/components/TextImageGenerator.tsx`
- UI components: `src/components/ui/`

## Getting Started

### Prerequisites
- Node.js >= 22.0.0
- npm or yarn

### Installation
```bash
git clone <repo-url>
cd react-vite-ui
npm install # or yarn install
```

### Development
```bash
npm run dev # or yarn dev
```

### Build
```bash
npm run build # or yarn build
```

### Lint
```bash
npm run lint
```

## Current Status
- MVP is functional: input, preview, and export text-to-image workflow works
- TypeScript errors resolved, codebase is type-safe
- Documentation is up to date (see `memory-bank/` for project context)

## Roadmap
- More export sizes and templates for additional platforms
- Theming and style customization
- Improved accessibility and mobile responsiveness
- Refactor parsing/rendering logic into reusable helpers

## License
MIT License. See [LICENSE](LICENSE) for details. 