# 0x1 Labs Design System

## Brand Direction
- Tone: premium, sharp, editorial, high-contrast.
- Palette: monochrome only (black, white, controlled grays).
- Motion: subtle, purposeful, never decorative overload.

## Color Tokens
- `--bg-canvas`: global dark backdrop.
- `--bg-panel`: elevated dark surfaces.
- `--surface`: bright cards and content planes.
- `--text-primary`: highest contrast headings.
- `--text-secondary`: body and supporting text.
- `--line-soft`, `--line-strong`: divider and card borders.

## Typography
- Display/Heading: `Space Grotesk`.
- Body: `Manrope`.
- Mono labels: `JetBrains Mono`.
- Heading rhythm: short line lengths, high contrast, large hierarchy jumps.

## Layout Rules
- Container: max width `1380px` with responsive side padding.
- Section rhythm: wide breathing room between hero, content, and footer.
- Cards: consistent radius and border density.

## Interaction Rules
- Primary interactions: 180-240ms transitions.
- Hover: subtle lift and contrast increase.
- Focus: visible and keyboard friendly.
- Reduced motion: respect `prefers-reduced-motion` globally.

## Mascot Usage
- Mascot serves narrative context, not decoration.
- One large mascot anchor per section max.
- Maintain clear silhouette and avoid overlap with primary copy.

## Blog Content System
- Source of truth: `content/blog/*.md`.
- Mandatory frontmatter:
  - `title`
  - `description`
  - `date` (ISO)
  - `author`
  - `tags` (array)
- Output:
  - SEO-friendly listing at `/blog`
  - SEO-friendly article pages at `/blog/[slug]`

## Accessibility Baseline
- Body text contrast >= WCAG AA.
- Semantic landmarks (`main`, `article`, `section`).
- Link and button states visible in all themes.
