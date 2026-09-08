---
name: Obsidian Estate Architectural UI
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0f0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a2a'
  surface-container-highest: '#363434'
  on-surface: '#e6e1e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e6e1e1'
  inverse-on-surface: '#323030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c7c6c6'
  on-secondary: '#303031'
  secondary-container: '#464747'
  on-secondary-container: '#b6b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#313030'
  tertiary-container: '#e5e2e1'
  on-tertiary-container: '#656463'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#141313'
  on-background: '#e6e1e1'
  surface-variant: '#363434'
  surface-lowest: '#0a0a0a'
  surface-base: '#141313'
  surface-card: '#1c1b1b'
  surface-elevated: '#201f1f'
  surface-overlay: '#2a2a2a'
  border-subtle: rgba(255, 255, 255, 0.08)
  border-hairline: '#444748'
  status-verified: '#27c93f'
  status-sale: '#ffffff'
  status-rent: '#98c379'
  status-pending: '#ffbd2e'
  status-error: '#ff5f56'
  chart-accent: '#61afef'
typography:
  display-xl:
    fontFamily: Noto Serif
    fontSize: 4.5rem
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Noto Serif
    fontSize: 2.5rem
    fontWeight: '400'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 2.5rem
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 1.875rem
    fontWeight: '400'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 2rem
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: normal
  headline-sm:
    fontFamily: Manrope
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: normal
  body-sm:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: normal
  label-lg:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Manrope
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.08em
  micro-meta:
    fontFamily: Manrope
    fontSize: 0.625rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0.15em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 0.5rem
  gutter-mobile: 1.25rem
  gutter-desktop: 2rem
  section-gap: 7.5rem
  card-padding-sm: 1.25rem
  card-padding-lg: 2rem
  container-max: 75rem
---

## Brand & Style

This design system is forged for an ultra-luxury real estate marketplace and high-tier property management SaaS platform. The brand personality is architectural, commanding, deeply discreet, and scholarly. It addresses ultra-high-net-worth investors, luxury developers, premier brokers, institutional asset managers, and discerning private buyers who expect an environment of quiet competence, absolute clarity, and refined taste.

The aesthetic philosophy fuses **Obsidian Minimalism** with **Tactile Architectural Layering** and **Subtle Glassmorphism**. Drawing inspiration from high-end architectural monographs (such as *Cereal* and *Kinfolk*) and precision institutional terminals, it rejects hyper-saturated commercial gradients and flashy real estate gimmicks. Instead, the UI relies on pitch-black abyssal surfaces, graduated deep charcoal strata, laser-fine 1px borders, luminous white typographic accents, and soft frosted glass surfaces. Every element conveys enduring stability, spatial restraint, and editorial prestige.

## Colors

The color architecture is dark-mode-first and strictly monochromatic at its base, utilizing subtle charcoal depths to carve out spatial hierarchy without visual noise:

- **Primary (`#ffffff`)**: Serves as the supreme focal trigger—applied to display headlines, active states, key interactive indicators, and primary white-pill CTA buttons.
- **Secondary (`#c7c6c6`) & Tertiary (`#e5e2e1`)**: Govern supporting metrics, property spec labels, architectural body text, and structural micro-copy.
- **Neutral Core (`#141313` & `#0a0a0a`)**: The foundational canvas backdrop mimicking honed black obsidian and basalt stone.

Functional real estate badge indicators and system signals employ calibrated muted accents:
- **Verified / Operational**: Heritage Green (`#27c93f` / `#98c379`).
- **Escrow / Pending**: Architectural Ochre (`#ffbd2e`).
- **Destructive / Alert**: Carmine Crimson (`#ff5f56`).
- **Surface Layering**: Expressed through `surface-lowest` (`#0a0a0a`), `surface-base` (`#141313`), `surface-card` (`#1c1b1b`), and frosted glass states `rgba(20, 19, 19, 0.75)` with hairline boundary strokes.

## Typography

The typographical pairing strikes an intentional tension between classical architectural curation and clinical SaaS efficiency:

- **Editorial Display & Major Real Estate Headings**: Set in **Noto Serif**. Headings maintain regular weights (`400`) and slight negative tracking, evoking prestigious European architectural digests and deed archives.
- **Interface, Financial Metrics, & System Data**: Set in **Manrope**. Its geometric clarity and balanced aperture ensure that multi-currency asset valuations, square-footage breakdowns, yield percentages, and GIS map coordinates remain razor-sharp at any density.
- **Section Supertitles & Metadata Badges**: Rendered in uppercase **Manrope** with generous tracking (`0.08em` to `0.15em`) and semibold weight to establish structural taxonomy without shouting.

## Layout & Spacing

The layout is grounded on an 8px architectural module (`0.5rem`). Whitespace is handled as an active structural luxury material:

- **Desktop Framework**: A 12-column responsive grid with a constrained max-width of `1200px` (`75rem`) for editorial narrative pages and a full-bleed 16-column layout for SaaS dashboards and spatial GIS split-map views.
- **Rhythm & Sectioning**: Major page sections are demarcated by a generous `120px` (`7.5rem`) vertical spacing cadence, giving multi-million-dollar listings and analytical suites breathing room.
- **Dashboard & Split-Screen Pattern**: The platform favors asymmetric splits—`40%` left panel for high-density listing metrics, mortgage simulations, and asset controls, and `60%` right pane dedicated to interactive GIS cartography, architectural photogrammetry, or live telemetry charts.
- **Mobile Adaptations**: Side margins contract gracefully to `20px` (`1.25rem`), cards collapse into continuous vertical stacks, and interactive horizontal filters scroll with snap alignments.

## Elevation & Depth

Visual hierarchy does not rely on heavy, muddy drop shadows. Instead, the design system implements **Tonal Stratification**, **Frosted Glassmorphism**, and **Hairline Boundary Outlines**:

- **Ground Zero (Canvas)**: `#0a0a0a` to `#141313`. Complete planar stillness.
- **Level 1 (Structural Cards & Property Grids)**: `#1c1b1b` or `#201f1f` bounded by a 1px solid stroke of `#444748` or `rgba(255, 255, 255, 0.08)`.
- **Level 2 (Floating Glass Morphism / Filter Overlays)**: Surface composed of `rgba(28, 27, 27, 0.75)` combined with `backdrop-blur-xl` and an inner perimeter edge highlight `inset 0 1px 0 rgba(255, 255, 255, 0.12)`.
- **Level 3 (Modals, Mortgage Calculators, Drawer Panels)**: `#201f1f` framed with an ambient, deeply diffused dark plume shadow (`0 24px 64px -12px rgba(0, 0, 0, 0.75)`).
- **Interactive Focus & Active States**: Conveyed not through dramatic luminance jumps, but through thin, razor-sharp 1px white strokes and delicate 2px active progress bars (`#ffffff`).

## Shapes

The geometric syntax is classified as **Soft Architectural (Level 1)**, intentionally paired with selective **Full Pill Radii** for interactive navigation and micro-badges:

- **Structural Cards, Portfolios, & Imagery**: Framed at `20px` (or `1.25rem`) for prominent visual anchors (listing media containers, dashboard command units, and footer envelopes), reflecting architectural windows.
- **Core SaaS Controls & Forms**: Text fields, data tables, and modal shells use `0.25rem` (4px) to `0.5rem` (8px) for disciplined, technical precision.
- **Interactive Action Pills**: Primary CTAs, listing status chips (e.g., `FOR SALE`, `VERIFIED`), and floating view toggles utilize `rounded-full` (`9999px`) to create an immediate, tactile affordance against the rigorous grid.

## Components

### 1. Buttons (Primary, Secondary, Ghost)
- **Primary CTA**: High-contrast solid pure white (`#ffffff`) pill with deep obsidian text (`#141313`), `font-medium`, `text-sm`, padding `py-3 px-8`. On hover, subtle lift (`-translate-y-0.5`) with light surface bloom.
- **Secondary / Outline**: Transparent fill, 1px solid boundary of `rgba(255, 255, 255, 0.2)` with text in `#e5e2e1`. Hover shifts the border to `rgba(255, 255, 255, 0.6)`.
- **Ghost Action**: Unbordered, text-white/60 hovering to full `#ffffff`, accompanied by micro-arrow translate cues.

### 2. Luxury Property Cards
- Bound by `surface-card` (`#1c1b1b`) with a `20px` outer radius and a 1px border (`rgba(255, 255, 255, 0.08)`).
- Visual media header features a subtle top-scrim gradient (`rgba(0,0,0,0.4)` to transparent) carrying the floating estate status chip and bookmark toggle.
- Typography within card: Price in **Noto Serif** (`headline-sm`, `#ffffff`), architectural specs (Bedrooms, Bathrooms, Sq Ft, Lot Size) rendered in **Manrope** (`label-sm`, `#c7c6c6`) separated by vertical hairline dividers (`#444748`).

### 3. Listing Status Chips & Verification Badges
- Compact pill indicators with `rounded-full`, padding `py-1 px-3`, `text-[10px]`, `tracking-[0.1em]`, `uppercase`, `font-semibold`.
- `For Sale`: Solid `#ffffff` text with a translucent white fill (`rgba(255, 255, 255, 0.1)`) and hairline border.
- `For Rent`: Accent green glyph with `rgba(152, 195, 121, 0.15)` fill.
- `Verified Asset`: Features a 4px green status dot beside `#27c93f` typography.

### 4. Input Fields & Search Command Bar
- Inactive state: Deep charcoal background (`#181717`) with 1px border (`#444748`) and placeholder text in `rgba(255, 255, 255, 0.35)`.
- Focused state: 1px border in pure white (`#ffffff`) with zero heavy rings, preserving an uncluttered silhouette.
- Multi-parameter Filter Pill Bar: Grouped horizontal container with integrated range sliders (price, yields) and dropdown selectors using `backdrop-blur-xl`.

### 5. Multi-Role SaaS Dashboards (Owners, Brokers, Developers, Admin)
- **Metric Cards (KPIs)**: Frosted glass modules (`#201f1f/90`) showing gross asset value, occupancy rate, and net yield. Large numbers in **Noto Serif** accompanied by micro-trend badges (`+12.4%`).
- **Data Tables**: Clean architectural records. Headers in `label-sm` (`#c7c6c6`), rows separated by 1px rules of `rgba(255, 255, 255, 0.05)`. Alternating row hover highlights to `rgba(255, 255, 255, 0.03)`.
- **Mortgage & Yield Calculator**: Interactive split component featuring slider tracks in `rgba(255, 255, 255, 0.2)` with solid white scrubber thumbs, coupled with live-calculated amortisation telemetry.