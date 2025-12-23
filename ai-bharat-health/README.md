# AI Bharat Health Mission 2026 - Landing Page

A premium, cinematic landing page for the AI Bharat Health Mission 2026 event.

## Features

- **Sticky Animated Header**: Logo groups, navigation links, and CTAs with scroll-based animations
- **Cinematic Hero Section**: Full-screen Wistia video background with animated AI SVG overlay
- **Scroll Animations**: Smooth Framer Motion animations triggered on viewport entry
- **Dark Premium Design**: Modern, tech-event aesthetic with glass morphism effects
- **Fully Responsive**: Optimized for all screen sizes
- **Accessible**: High contrast, semantic HTML, keyboard navigation support
- **Sections**:
  - About Event
  - Theme
  - Why Attend
  - What to Expect
  - AI Diagnosis Showdown
  - Partnerships
  - Registration Form

## Tech Stack

- **React**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173/`

## Project Structure

```
ai-bharat-health/
├── public/
│   └── logos/           # BioSpectrum and AI Spectrum logos
├── src/
│   ├── App.jsx          # Main application with all components
│   ├── App.css          # Minimal CSS (using Tailwind)
│   ├── index.css        # Tailwind directives and custom utilities
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## Component Overview

### Header
- Animated sticky header with blur backdrop
- Logo groups (BioSpectrum, AI Spectrum)
- Navigation with animated underlines
- CTA buttons

### Hero
- Wistia video background (autoplay, muted, looping)
- Animated AI SVG with floating motion
- Gradient title text
- Primary CTA button

### Content Sections
All sections feature:
- Scroll-triggered animations
- Glass morphism cards
- Gradient accent colors
- Responsive layouts

### Registration Form
- Name, email, company, and role fields
- Form validation
- Animated submit button
- (Demo mode - no backend)

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  'dark-bg': '#0a0a1a',
  'dark-card': '#1a1a2e',
  'accent-purple': '#8b5cf6',
  'accent-blue': '#3b82f6',
}
```

### Animations
Modify Framer Motion props in `App.jsx` to adjust animation timings and effects.

### Video Background
Replace the Wistia embed URL in the Hero component to use a different video.

## Performance Notes

- Video background is optimized with pointer-events: none
- Animations use GPU-accelerated properties
- Lazy loading for viewport-triggered animations
- Minimal JavaScript bundle size

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This is a demonstration project for AI Bharat Health Mission 2026.
