---
name: Zero One Labs — Signal Chamber
description: A hard-cut monochrome chamber where persistent ideas become public products.
colors:
  ink: "#050505"
  paper: "#f5f5f0"
  graphite: "#262626"
  silver: "#d7d7d1"
  muted: "#777772"
  white: "#ffffff"
  line-dark: "rgba(5, 5, 5, 0.18)"
  line-light: "rgba(255, 255, 255, 0.28)"
typography:
  display-impact:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(4rem, 9vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.055em"
  display-editorial:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.5rem, 7.5vw, 7.5rem)"
    fontWeight: 650
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  signal:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  none: "0"
  mark-presentation: "6px"
  circle: "50%"
spacing:
  edge-compact: "1rem"
  edge-wide: "1.5rem"
  chamber-edge: "max(1.5rem, calc((100vw - 1480px) / 2))"
  section: "clamp(7rem, 12vw, 13rem)"
components:
  action-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0.8rem 1rem"
    height: "48px"
  action-primary-inverse:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.8rem 1rem"
    height: "48px"
  index-trigger:
    backgroundColor: "rgba(245, 245, 240, 0.94)"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "48px"
---

# Design System: Zero One Labs

## Overview

**Creative North Star: “Signal Chamber”**

Persistent ideas become visible through exposure, contrast, and proof. The system is an editorial chamber of black, off-white, graphite, founder-shot field photographs, hard positive-negative apertures, authored dither, and the original `0x1` mark. It feels decisive, curious, and crafted without turning the company into an agency or a generic startup.

The homepage moves from one idea under observation to origin, five public products, unreleased work, and Careers. Public interior routes use the same palette and hard-cut composition with calmer reading structures. Product truth, direct destinations, and semantic content always outrank spectacle.

**Key Characteristics:**

- Monochrome shells with colour appearing only when an image's meaning requires it.
- Oversized Archivo statements, warm Manrope copy, and sparse JetBrains Mono signal data.
- Native document scrolling, asymmetrical apertures, alternating positive/negative fields, and unboxed editorial rows.
- One authored WebGL moment; all other visual mechanisms remain CSS, SVG, raster, and semantic DOM.

## Colors

The palette is optical rather than decorative: Ink and Paper perform the primary positive-negative exchange; Graphite, Silver, Muted, and the line tokens supply depth and hierarchy.

### Primary

- **Chamber Ink:** Default dark field, text, controls, Index overlay, and footer.
- **Signal Paper:** Main light field and the warmer alternative to sterile white.

### Secondary

- **Graphite:** Secondary dark interiors, especially role-detail reading fields.
- **Silver:** Image fallback, quiet structural field, and soft separation.

### Neutral

- **Muted:** Secondary text on Paper where full Ink would compete.
- **White:** Maximum-contrast type, inverse actions, and deliberate bright apertures.
- **Dark and Light Lines:** One-pixel rules organize rows and facts without creating cards.

**The Binary Palette Rule.** Do not add an interface accent. In particular, orange is rejected. Natural colour may appear inside approved field photography or a product-specific proof when colour itself carries meaning; the grayscale-to-colour hover is an intentional reveal, not a new UI palette.

## Typography

**Display Font:** Archivo (sans-serif fallback)  
**Body Font:** Manrope (sans-serif fallback)  
**Signal Font:** JetBrains Mono (monospace fallback)

Archivo supplies compressed, high-impact statements and product names. Manrope carries every explanatory sentence and action label. JetBrains Mono is limited to counters, field notes, compact status data, and instrument-like annotations; it is not a decorative texture.

### Hierarchy

- **Impact display:** Black Archivo with very tight tracking and a compressed line box; use for the homepage thesis, runway names, Index destinations, and major invitations.
- **Editorial display:** Medium-to-bold Archivo with slightly calmer tracking; use for interior heroes and long-form section statements.
- **Body:** Manrope at a readable `1–1.4rem` range, generally held near `38–57ch` with generous leading.
- **Signal:** Uppercase or numeric JetBrains Mono around `0.65–0.75rem`, with deliberate tracking; reserve it for factual orientation.

**The One Exposure Rule.** Give each viewport one dominant Archivo statement. Supporting copy must stay visibly subordinate.

## Layout

The main wide frame is capped at `1480px` with a fluid side gutter. Signal Chamber prefers split fields, full-height scenes, diagonal clips, long rules, and asymmetric editorial rows over centered stacks. Home uses `.sc-*`; public product, company, contact, and role-detail interiors use the shared `.si-page` foundation.

The homepage runway maps ordinary vertical page progress to a sticky horizontal strip. Its height and strip width derive from the product count, and each product occupies one viewport. The browser owns scrolling: never capture wheel or touch input, and never make a precise gesture necessary. At compact widths and under reduced motion, the same scenes become a normal vertical document with the visual before the copy.

### Responsive thresholds

- **Above `980px`:** The hero may show the raw-WebGL Binary Altitude treatment over its photograph.
- **At `980px` and below:** Hide the canvas and retain the complete static, high-contrast photograph beneath it.
- **At `900px` and below:** Signal Chamber interiors collapse split grids to one column; product, about, contact, and role-detail sections reorder for reading.
- **At `760px` and below:** Home becomes a vertical flow, the Index label becomes visually hidden, and product scenes stop translating horizontally.
- **At `640px` and below:** Interior typography, facts, email, and application layouts tighten again for narrow screens.

Reduced motion is a layout mode, not merely a shorter animation: remove the WebGL canvas, disable signal blinking, make the runway vertical, and preserve static apertures. Continue to test landscape, safe areas, keyboard appearance, large text, and the actual content length rather than relying only on nominal breakpoints.

## Elevation & Depth

Signal Chamber is flat by default. Depth comes from positive-negative fields, photographic atmosphere, clipping, overlap, grayscale/colour transitions, dither, and thin rules. Product artifacts alone may use restrained drop shadows when needed to separate real proof from a field image; ordinary content never floats.

The Binary Altitude hero is the only WebGL surface. Its raw shader converts the founder-shot peak into an authored black/white Bayer threshold whose exposure follows native scroll and whose distortion responds subtly to a non-touch pointer. Composite the ready canvas with safe `screen` blending at low opacity (`0.22` at rest, `0.12` while the photograph is revealed) so it adds exposure without crushing or obscuring the image. It must initialize lazily, redraw only when invalidated, dispose cleanly, survive context loss, and reveal only after ready. The underlying optimized image is always the fallback for unsupported WebGL, errors, `<=980px`, reduced motion, and before initialization.

**The One Shader Rule.** Do not spread canvas effects across the site. The single threshold field is memorable because the remaining system is materially simple.

## Shapes

The form language is square, circular, and cut rather than softly rounded. Controls and editorial surfaces are predominantly rectangular with one-pixel borders; diagonal hero and image apertures create the signature silhouette. Circles belong to signals, orbits, lenses, and spotlight reveals. Small corner rounding is allowed only when presenting the existing mark legibly.

`public/favicon.svg` is the original editable browser/platform icon source: preserve its `512 × 512` viewBox and exact black `0x1` path geometry. It may appear black on white/off-white or as an exact white-on-black inverse presentation; the geometry must not be redrawn, retyped, simplified, or casually recoloured. Navigation deliberately uses only the `ZERO ONE LABS` wordmark, without a separate logo or `0x1` mark. The footer may retain its compact text mark. Keep favicon, manifest, and metadata icon outputs synchronized when making a deliberate brand-wide icon change, but do not reintroduce the image tile into the shell.

The primary navigation is a persistent full-width strip: 72px on wide screens and 64px on compact screens. It never hides on scroll and always uses the same solid Paper surface with Ink text, regardless of the content beneath it. The lower rule and shadow remain fully absent at the top of the page and appear only after the visitor begins scrolling. Navigation text never uses blend mode, opacity, or translated centering. The primary `ZERO ONE LABS` wordmark is uppercase, heavy, tightly tracked, and substantially larger at up to `1.55rem`.

## Components

### Navigation and Index

The opening navigation consists only of the `ZERO ONE LABS` wordmark and the quiet plus-shaped Index trigger. The Index is a compact Ink sheet anchored to the right, capped at `520px` and full-width only when the viewport requires it. Its large Archivo destinations remain in this order: Work, Company, Careers, Contact. Active and hover states italicize and shift the destination; desktop shows a short explanatory note, while compact navigation hides that note and visually hides the Index word without removing its accessible name.

Opening the Index locks body scroll, moves focus to the first destination, traps Tab and Shift+Tab, and exposes the dialog with `aria-modal`. Escape closes it, focus returns to the trigger, and every link and close button in a closed Index has `tabIndex={-1}`. Route state marks Work active for every `/products/*` destination.

### Binary Altitude hero

The first viewport pairs a large Paper diagonal with a founder-shot peak. The thesis, supporting copy, and Enter link remain semantic DOM above or beside the image; the canvas is decorative and `aria-hidden`. Preserve the static `<Image>` with factual alt text and responsive sizing even when the shader is available. The photograph rests in high-contrast grayscale. Hover creates a full-frame chroma bloom: grayscale, saturation, contrast, and brightness interpolate together until the entire photograph reaches natural colour while the image breathes forward by roughly one percent and the screen-blended canvas recedes.

### Product runway and registry

`lib/products.ts` is the single product registry. `orderedProducts` sorts by `featuredOrder` and feeds the homepage, `/products`, generated `/products/[slug]` routes, metadata, structured data, and direct product links. Never duplicate or hand-order a product list in a component. Reorder products only by changing unique `featuredOrder` values.

Each scene alternates Ink and Paper and builds a product-native visual instrument around the real product artifact: orbital risk for Comet, route proof for Verdict, timing rings for Kairos, a 20–20–20 field for Lumin, and analysed swatches for HueLens. Product showcases do not use mountain photography. Each scene includes a direct external product-site action plus verified store links and an internal detail link. On the desktop runway, only the active scene may be exposed to assistive technology or keyboard input; inactive scenes use `aria-hidden` and set every action to `tabIndex={-1}`. Vertical mobile and reduced-motion scenes are all interactive.

To add a future product:

1. Add one complete registry object with a stable unique lowercase `slug`, unique `featuredOrder`, truthful copy, type, platforms, direct `siteUrl`, actions, supported `visualKind`, image paths/alts, and ISO `lastVerified` date.
2. Add only verified public store destinations. External links open in a new tab with `rel="noreferrer"`; the product note remains internal.
3. Supply an owned or approved product artifact and define a visual mechanism derived from what the product actually does. Preserve aspect ratio, responsive `sizes`, useful alt text, and a static fallback.
4. Confirm the homepage order, product index, generated detail route, metadata, structured data, keyboard isolation, compact layout, and reduced-motion layout all update from the registry.

Avoid changing a published slug. Update `status`, `statusLabel`, `storeLinks`, `primaryAction`, and `lastVerified` together whenever availability changes.

### Field-photo semantics

Photography is evidence and metaphor, never filler. It is reserved for the company story:

- **Persistence:** the recurring peak introduces an idea worth returning to.
- **Origin:** paused trail shoes and open terrain show attention before making.

Approved mountain and field photographs in the company story rest in grayscale and transition as a complete frame into restrained natural colour. The transition uses a long exponential deceleration rather than a cursor aperture or hard filter toggle, and reverses smoothly when the pointer leaves. This is a discovery cue only: touch, keyboard, reduced-motion, and non-hover users receive the same meaning and content without it.

Inside the product runway, hovering an entire product scene activates its mechanism and returns product artwork to its source colour when that source contains colour. Intentionally monochrome artwork such as Verdict remains monochrome. Touch and reduced-motion layouts keep a stable composition with the same content and actions.

Lumin is presented as a true `16:9` macOS display proof inside a typographic 20–20–20 field. The macOS interface is never rotated, preserving readable UI text.

Public product surfaces do not display release-state labels such as `in review`, `available`, `coming soon`, or similar lifecycle wording. Let visitors understand each product through its purpose, platform, proof, and working destinations; internal publication state stays out of the storytelling interface.

### Actions and focus

Primary actions are square, bordered, minimum-`48px` controls that invert between Ink and White according to their field. Secondary actions are underlined text links. Hover may italicize the label; it must not be the only state cue.

General links and controls receive a `3px` current-colour outline with a `5px` offset. Critical actions use the two-tone ring: a Paper `3px` outline at `2px` offset plus an Ink outer ring at `6px`. Preserve the skip link, logical heading order, semantic `main#main-content`, factual image alternatives, `aria-hidden` decoration, and minimum `48px` primary controls.

### Careers spotlight

The Careers hero is an Ink stage with a pointer-following circular white exposure and difference-blended copy. The spotlight is decorative; the headline, explanation, and “Open now” link remain semantic and readable without pointer movement. Mobile replaces the moving circle with a fixed diagonal aperture, and reduced motion fixes the reveal. Opening rows use rules rather than cards and invert on hover or `focus-within`; empty-state content remains equally intentional.

### Signal Chamber interiors

Reuse `.si-page` and its existing route families before creating a new frame: `.si-index-*` and `.si-product-row*` for the public registry, `.si-product-*` for product notes, `.si-about-*` for company storytelling, `.si-contact-*` for direct correspondence, and `.si-role-*` for career details and application. Shared `.si-button`, `.si-text-link`, and `.si-back-link` patterns keep actions consistent. Interiors use calmer Archivo weight, long reading measures, hard grid cuts, alternating Ink/Paper fields, and Graphite only where a second dark reading layer is needed.

### Assets and provenance

Field and brand photography is founder-authored and supplied for commercial website use. Retain the best editable or lossless source outside delivery exports, record photographer/source and permission with new assets, and publish optimized responsive raster derivatives. Current field frames are presentation crops, not permission to upscale or fabricate detail.

Keep SVG sources editable and preserve their viewBoxes; do not rasterize the favicon, HueLens mark, or Verdict proof artwork without a renderer constraint. Product imagery must be owned, approved, and factually current. Higher-resolution Comet gameplay, a lossless Lumin master, and a verified HueLens analysis capture should replace current presentation assets when available; do not invent them in the meantime.

## Do's and Don'ts

### Do

- **Do** preserve Signal Chamber's monochrome exposure logic, native scroll, direct product exits, and one-shader limit.
- **Do** keep product order, copy, links, availability, route generation, and verification dates in the registry.
- **Do** use photography only with a documented semantic role, truthful alt text, responsive delivery, and known provenance.
- **Do** test keyboard navigation, closed-dialog isolation, offscreen-scene isolation, reduced motion, static fallbacks, large text, and both sides of every focus treatment.
- **Do** reuse the `.sc-*` home/careers system and `.si-*` interior system before adding another public-page language.

### Don't

- **Don't** add orange or another generic brand accent; colour is reserved for meaningful approved imagery and proof.
- **Don't** revive “Story Map,” trail, journey, chapter, or numbered-story labels. “Index” is the navigation model.
- **Don't** repeat Kathmandu origin copy or a second hard-coded product list across routes; place each fact once and derive product views from the registry.
- **Don't** use people imagery for Verdict. Its visual proof is route, environment, capture, and accountability data.
- **Don't** replace hard-cut editorial fields and rows with generic card stacks, rounded dashboard tiles, glass panels, or ornamental shadows.
- **Don't** make essential copy, links, or status depend on WebGL, animation, hover, colour, or precise scrolling.
- **Don't** redraw, retype, casually recolour, or approximate the favicon; only exact black/white inverse presentation is allowed.
