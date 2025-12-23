# AI Bharat Health Mission 2026 - Landing Page

A premium, medical-grade landing page inspired by RAISE Summit's layout but with BioSpectrum Asia's clean green branding.

## Design Philosophy

This landing page combines:
- **RAISE Summit's sophisticated layout**: Mixed typography, floating glass cards, geometric overlays
- **BioSpectrum's medical aesthetic**: Deep navy backgrounds, professional green accents (#00A651)
- **Healthcare premium feel**: Clean, spacious, trustworthy design for healthcare AI

## Features

### Layout & Design
- **RAISE-Inspired Hero**: Mixed serif/sans typography ("Where health leaders and AI converge")
- **Floating Glass Info Card**: Right-side card with mouse parallax tilt effect
- **Geometric Lattice Overlay**: Subtle white lattice pattern on right side
- **Giant AI Watermark**: Animated AI text with green glow behind content
- **BioSpectrum Color Palette**:
  - Ink (#071225) & Navy (#0B1B3A) backgrounds
  - BioSpectrum Green (#00A651) & Bright Green (#2BD576) accents
  - Glass surfaces with backdrop blur

### Components
- **Sticky Animated Header**: Morphs on scroll with logo groups and nav
- **Hero Section**: Wistia video background, mixed typography, floating card
- **Content Sections**: About, Theme, Why Attend, What to Expect, AI Diagnosis Showdown
- **Partnership Section**: With download brochure CTA
- **Registration Form**: Glass form with green accent on focus
- **Scroll Animations**: Framer Motion viewport-triggered reveals

### Technical Features
- **Responsive Design**: Fully optimized for all screen sizes
- **Glassmorphism**: Premium backdrop blur effects throughout
- **Mouse Parallax**: Floating card tilts on mouse movement
- **Green Glow Effects**: Soft glows on buttons and accents
- **CSS Variables**: Easy theming with CSS custom properties
- **Accessibility**: High contrast, semantic HTML, keyboard support

## Tech Stack

- **React**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS v3**: Utility-first styling
- **Framer Motion**: Advanced animations
- **Google Fonts**: Inter (sans) + Playfair Display (serif)

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
│   └── logos/           # BioSpectrum and AI Spectrum logos (SVG)
├── src/
│   ├── App.jsx          # Main application with all components
│   ├── App.css          # Minimal CSS
│   ├── index.css        # Tailwind + CSS variables + custom utilities
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.js       # Vite configuration
```

## Component Breakdown

### Header
- Fixed position with backdrop blur
- Dual logo groups (BioSpectrum + AI Spectrum)
- Center navigation with green underline animation
- Glass secondary button + green gradient primary button
- Shrinks and increases blur on scroll

### Hero
- **Background Layers**:
  - Wistia video (20% opacity, as texture)
  - Green-tinted radial gradient overlay
  - Heavy gradient for text readability
- **Mixed Typography Headline**:
  - "Where" (serif italic, muted)
  - "health leaders and AI" (bold sans, white)
  - "converge" (serif italic, green gradient)
- **Floating Glass Card** (right side):
  - Date and location info
  - Two stacked CTAs
  - Mouse parallax tilt effect
  - Slow vertical float animation
- **Decorative Elements**:
  - Geometric lattice overlay (8% opacity)
  - Giant "AI" watermark (8-12% opacity, green glow)

### Content Sections
All sections use:
- Glass cards with hover effects
- Green accent bars/dots
- Scroll-triggered fade + rise animations
- Spacious padding and typography
- Responsive grid layouts

### Registration Form
- Glass card container
- Input fields with green focus rings
- Green gradient submit button with glow
- Form validation (HTML5)
- Demo mode (no backend)

## Customization

### Color Scheme

Colors are defined as CSS variables in `src/index.css`:

```css
:root {
  --ink: #071225;          /* Deep navy background */
  --navy: #0B1B3A;         /* Secondary background */
  --surface: rgba(255, 255, 255, 0.06);   /* Glass fill */
  --stroke: rgba(255, 255, 255, 0.14);    /* Glass border */
  --text: rgba(255, 255, 255, 0.92);      /* Primary text */
  --muted: rgba(255, 255, 255, 0.70);     /* Secondary text */
  --accent: #00A651;       /* BioSpectrum green */
  --accent2: #2BD576;      /* Bright green */
  --highlight: rgba(0, 166, 81, 0.35);    /* Green glow */
}
```

Also update Tailwind config colors for utility classes.

### Fonts

Update the Google Fonts import in `src/index.css` to change typography.

### Animations

Modify Framer Motion props in `App.jsx`:
- Duration, delay, easing
- Animation variants
- Viewport margins for scroll triggers

### Video Background

Replace the Wistia embed URL in the Hero component with your video URL.

## Design Details

### Typography Scale
- Hero headline: 5xl → 8xl (responsive)
- Section headings: 5xl → 6xl
- Body text: lg → xl
- Small text: xs → sm

### Spacing
- Section padding: py-32 (128px)
- Container max-width: 1440px
- Content max-width: varies (2xl to 6xl)

### Border Radius
- Cards: 2xl to 3xl (16-24px)
- Buttons: full (pill shape)
- Inputs: xl (12px)

### Glass Effect
- Backdrop blur: 24-32px
- Background: white 6-10% opacity
- Border: white 14-20% opacity

## Performance

- Video at 20% opacity reduces visual weight
- Animations use `transform` and `opacity` (GPU-accelerated)
- Viewport-triggered animations (lazy load)
- Optimized bundle with Vite
- Minimal dependencies

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Credits

Design inspired by:
- RAISE Summit 2026 (layout and typography)
- BioSpectrum Asia (color palette and branding)

## License

Demo project for AI Bharat Health Mission 2026.
