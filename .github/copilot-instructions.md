# AI Coding Agent Instructions for Project-3

## Project Overview
This is a static HTML/CSS website showcasing Intel's Sustainability Timeline. No build process, backend, or JavaScript framework—pure semantic HTML with modern CSS for interactivity and responsive design.

## Architecture & Key Patterns

### HTML Structure
- **Semantic HTML**: Uses Bootstrap accordion for expandable timeline items (no native details required)
- **Bootstrap Grid**: Goals section uses Bootstrap 5 responsive grid (`container`, `row`, `col-md-4`)
- **Bootstrap Accordion**: Timeline section uses `accordion` component with collapsible items
- **Content Sections**:
  - `.hero`: Gradient header with Intel branding
  - `.timeline`: Bootstrap accordion with timeline items
  - `.goals-section`: Three-column Bootstrap grid with goal cards
- **Location**: [index.html](index.html)

### CSS Strategy
- **Responsive Layout**: Bootstrap grid for goals section (`col-md-4` for three columns), Bootstrap accordion for timeline
- **Scroll-Snap**: Full page scroll-snap for smooth section navigation
- **Animations & Interactivity**: 
  - Accordion buttons with color transitions on hover/active state (0.3s ease)
  - Bootstrap accordion auto-collapse with `data-bs-parent` attribute
  - Icon hover effects in goal cards
- **Color Scheme**: Intel blue (#0071c5) for active accordion button text, gradient header (#0071c5 → #00a0e3)
- **Location**: [style.css](style.css)

## Development Workflows

### RTL Language Support
The site automatically detects and applies RTL (Right-to-Left) layout for languages like Arabic, Hebrew, Persian, and Urdu.

**Auto-Detection**: The `script.js` file monitors:
- HTML `lang` attribute changes (triggered by Google Translate or manual updates)
- MutationObserver watches for language attribute changes in real-time
- Navigator language on initial page load

**Manual Language Control**:
```javascript
// Set language and apply RTL/LTR automatically
window.setLanguage('ar');  // Arabic (applies RTL)
window.setLanguage('en');  // English (applies LTR)

// Get current language
const currentLang = window.getCurrentLanguage();
```

**Supported RTL Languages**: Arabic (ar), Hebrew (he), Persian (fa), Urdu (ur), Yiddish (yi), and others

### Editing Content
- **Timeline items**: Modify accordion-item blocks within the `#timelineAccordion` accordion (HTML lines ~22-58)
- **Goal cards**: Add/edit `<div class="col-md-4">` blocks within `.row` (HTML lines ~63-90)
- **No CSS changes needed** for new content if following existing card structure

### Styling Guidelines
- Use `scroll-snap-align` and `scroll-snap-stop` on major sections (already set)
- Maintain 0.3s transition timing for consistent animation feel
- Use rgba transparency for overlays (e.g., `.hero-logo` background)
- Test hover states at both desktop and mobile breakpoints

### Adding New Content
- Timeline: Copy existing accordion-item block structure within `#timelineAccordion`. Update the button text, collapse ID (e.g., `#collapse5`), `data-bs-target` reference, and accordion body content
- Goals: Copy existing `<div class="col-md-4">` block with goal-card—update icon class from Font Awesome, heading, and description
- Both automatically inherit responsive styling via existing CSS classes or Bootstrap grid

## Integration & Dependencies
- **Bootstrap 5.3.0 CDN**: Provides responsive grid system for three-column layout
- **Font Awesome CDN** (v6.5.0): Provides icon library for goal cards (`<i class="fa-solid fa-*">`)
- **JavaScript RTL Detection** ([script.js](script.js)): Auto-detects page language and applies RTL dynamically
  - Monitors language changes via Google Translate or manual language switching
  - Automatically applies `dir="rtl"` to HTML element for RTL languages (Arabic, Hebrew, Persian, Urdu, etc.)
  - Exposes `window.setLanguage(langCode)` for manual language control
- **Logo asset**: intel-logo.png (referenced in README, not currently displayed in HTML)

## Conventions
- Keep timeline section max-width at **900px** for readability (goals section uses Bootstrap container)
- Use **native HTML elements** (`<details>`, semantic tags) over JavaScript alternatives
- Maintain **blue gradient** theme from header for brand consistency
- All interactive elements should have **smooth 0.3s transitions**
- Bootstrap grid is mobile-first: `col-md-4` stacks responsively on mobile
- **RTL Support**: Enabled via `dir="rtl"` attribute on `<html>` tag; CSS uses `[dir="rtl"]` selector for language-specific styling

## Common Tasks
| Task | Location | Pattern |
|------|----------|---------|
| Add timeline period | [index.html](index.html#L22-L58) | Copy `accordion-item` block, update button text, collapse ID, and body content |
| Add goal card | [index.html](index.html#L63-L90) | Copy `<div class="col-md-4">` block with goal-card, update icon/text |
| Adjust accordion styling | [style.css](style.css#L56-L102) | Modify `.accordion-button`, `.accordion-body`, or `.accordion-item` rules |
| Change brand colors | [style.css](style.css#L32-L33) | Update hex values in `.hero` background gradient |
