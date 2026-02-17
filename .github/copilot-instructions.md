# AI Coding Agent Instructions for Project-3

## Project Overview
This is a static HTML/CSS website showcasing Intel's Sustainability Timeline. No build process, backend, or JavaScript framework—pure semantic HTML with modern CSS for interactivity and responsive design.

## Architecture & Key Patterns

### HTML Structure
- **Semantic HTML**: Uses native `<details>` elements for expandable timeline items (no JavaScript required)
- **Bootstrap Grid**: Goals section uses Bootstrap 5 responsive grid (`container`, `row`, `col-md-4`)
- **Content Sections**:
  - `.hero`: Gradient header with Intel branding
  - `.timeline`: Collapsible timeline items using `<details>/<summary>`
  - `.goals-section`: Three-column Bootstrap grid with goal cards
- **Location**: [index.html](index.html)

### CSS Strategy
- **Responsive Layout**: Bootstrap grid for goals section (`col-md-4` for three columns), custom styles for timeline
- **Scroll-Snap**: Full page scroll-snap for smooth section navigation
- **Animations**: 
  - Hover states with scale/transform transitions (0.3s ease)
  - Timeline expansion with CSS-only arrow rotation (`::before` pseudo-element)
  - Icon hover effects in goal cards
- **Color Scheme**: Intel blue gradient (#0071c5 → #00a0e3) in header
- **Location**: [style.css](style.css)

## Development Workflows

### Editing Content
- **Timeline items**: Modify `<details>` elements in `.timeline` section (HTML lines ~22-33)
- **Goal cards**: Add/edit `<div class="col-md-4">` blocks within `.row` (HTML lines ~54-62)
- **No CSS changes needed** for new content if following existing card structure

### Styling Guidelines
- Use `scroll-snap-align` and `scroll-snap-stop` on major sections (already set)
- Maintain 0.3s transition timing for consistent animation feel
- Use rgba transparency for overlays (e.g., `.hero-logo` background)
- Test hover states at both desktop and mobile breakpoints

### Adding New Content
- Timeline: Copy existing `<details class="timeline-item">` block structure
- Goals: Copy existing `<div class="col-md-4">` block with goal-card—update icon class from Font Awesome, heading, and description
- Both automatically inherit responsive styling via existing CSS classes or Bootstrap grid

## Integration & Dependencies
- **Bootstrap 5.3.0 CDN**: Provides responsive grid system for three-column layout
- **Font Awesome CDN** (v6.5.0): Provides icon library for goal cards (`<i class="fa-solid fa-*">`)
- **No local dependencies**: All styling self-contained in style.css
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
| Add timeline period | [index.html](index.html#L22-L33) | Copy `<details>` block, update summary & paragraph |
| Add goal card | [index.html](index.html#L54-L62) | Copy `<div class="col-md-4">` block with goal-card, update icon/text |
| Adjust spacing | [style.css](style.css#L32-L37) | Modify padding/margin on `.timeline` or `.goals-section` |
| Change brand colors | [style.css](style.css#L32-L33) | Update hex values in `.hero` background gradient |
