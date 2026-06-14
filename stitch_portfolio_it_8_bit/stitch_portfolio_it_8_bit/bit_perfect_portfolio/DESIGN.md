---
name: Bit-Perfect Portfolio
colors:
  surface: '#111125'
  surface-dim: '#111125'
  surface-bright: '#37374d'
  surface-container-lowest: '#0c0c1f'
  surface-container-low: '#1a1a2e'
  surface-container: '#1e1e32'
  surface-container-high: '#28283d'
  surface-container-highest: '#333348'
  on-surface: '#e2e0fc'
  on-surface-variant: '#dac2ad'
  inverse-surface: '#e2e0fc'
  inverse-on-surface: '#2f2e43'
  outline: '#a28d79'
  outline-variant: '#544433'
  surface-tint: '#ffb869'
  primary: '#ffc485'
  on-primary: '#482900'
  primary-container: '#ff9d00'
  on-primary-container: '#663c00'
  inverse-primary: '#885200'
  secondary: '#eeb1ff'
  on-secondary: '#53006f'
  secondary-container: '#701c8e'
  on-secondary-container: '#e697ff'
  tertiary: '#00e5f4'
  on-tertiary: '#00363a'
  tertiary-container: '#00c7d4'
  on-tertiary-container: '#004e53'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbb'
  primary-fixed-dim: '#ffb869'
  on-primary-fixed: '#2c1700'
  on-primary-fixed-variant: '#673d00'
  secondary-fixed: '#f9d8ff'
  secondary-fixed-dim: '#eeb1ff'
  on-secondary-fixed: '#330045'
  on-secondary-fixed-variant: '#701c8e'
  tertiary-fixed: '#7df4ff'
  tertiary-fixed-dim: '#00dbe9'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#111125'
  on-background: '#e2e0fc'
  surface-variant: '#333348'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 16px
  container-max: 1200px
---

## Brand & Style

This design system blends **Retro-8-bit aesthetics** with a modern **Brutalist** structure. The goal is to create a digital environment that feels like a premium arcade cabinet while maintaining the clarity and professionalism required for an IT student's portfolio. 

The visual language is defined by rigid geometry, "stair-stepped" pixel patterns, and high-energy color contrasts. It targets an audience that appreciates the intersection of classic computing history and modern software engineering. The emotional response should be one of nostalgia, technical precision, and playful confidence.

Key characteristics include:
- **Pixel-perfect alignment:** All borders and elements adhere to a simulated grid.
- **Blocky visuals:** Avoiding all curves in favor of 90-degree angles.
- **High Contrast:** Strong separation between foreground content and background containers.

## Colors

The palette is rooted in a **Dark Mode** foundation to evoke deep-space arcade backgrounds.
- **Primary (Orange):** Used for critical actions, headers, and highlights. It provides a warm, energetic focal point.
- **Secondary (Purple):** Used for interactive containers, secondary buttons, and decorative accents.
- **Tertiary (Cyan):** Used for "Power-up" states, success indicators, and technical data readouts.
- **Neutral (Dark Blue/Black):** The surface and background base, providing a "low-emission" environment that makes vibrant colors pop.
- **Accent (White/Off-white):** Reserved strictly for high-readability body text and "glitch" effect highlights.

## Typography

Typography balances character with legibility. 
- **Headlines:** Use **Space Grotesk** for a modern-geometric feel that mimics the structural weight of classic pixel fonts without sacrificing readability. Large headings should use a heavy weight.
- **Body:** **JetBrains Mono** provides the "code-first" IT aesthetic. Its monospaced nature ensures characters line up vertically, reinforcing the grid-based 8-bit feel.
- **Labels:** **Space Mono** is used for small metadata, tags, and button text to maintain the technical, "machine-read" vibe.

*Implementation Note:* For a true "arcade" feel, apply `text-transform: uppercase` to all headers and buttons.

## Layout & Spacing

The layout follows a **Fixed Grid** model. All spacing must be multiples of **4px** to ensure that elements feel locked into a pixel grid.

- **Desktop:** A 12-column grid with 24px gutters. Content is centered within a 1200px container.
- **Mobile:** A 4-column grid with 16px margins.
- **Rhythm:** Use generous "breathing room" (32px or 48px) between major sections to prevent the blocky elements from feeling cluttered. 

Components should use "Inner Padding" of 16px or 24px to ensure text does not touch the heavy borders.

## Elevation & Depth

This design system avoids soft shadows and blurs entirely. Depth is created through **Hard Shadows** and **Tonal Layering**:

- **Level 0 (Background):** Deep Neutral (#1A1A2E).
- **Level 1 (Containers):** Slightly lighter Dark Blue or Secondary Purple with a 4px solid black border.
- **Level 2 (Interactive):** Elements that appear "pressed" or "raised" use a solid 4px offset shadow in a contrasting color (e.g., an Orange button with a solid Purple shadow).
- **State Changes:** When an item is hovered, the solid shadow should disappear, and the element should translate 4px down and right to simulate a physical "click" in a 2D plane.

## Shapes

The shape language is strictly **Sharp (0px)**. 

- All buttons, input fields, and cards must have square corners.
- To create an "8-bit" corner effect on larger containers, you may use a "cut-corner" (chamfer) or a stepped-pixel border, but standard CSS `border-radius` must remain `0`.
- Icons should be pixel-art style, using thick strokes and avoiding anti-aliasing where possible.

## Components

### Buttons
Primary buttons use a Primary Orange background with a 4px solid Black border and a 4px solid Secondary Purple offset shadow. Text is bold and uppercase.

### Cards
Cards are the primary container for portfolio projects. They feature a Level 1 background, a heavy 4px border, and a "Header Bar" using the Secondary Purple color to house the project title.

### Input Fields
Inputs are rectangular with a dark background and a Primary Orange border. The cursor should be a solid, non-blinking block to mimic terminal environments.

### Chips/Tags
Tags use the Tertiary Cyan color for the border and text, set against a dark background. They serve as "inventory items" for skills (e.g., JavaScript, Python).

### Progress Bars
Used for skill levels. These should be "chunked" rather than smooth gradients—broken into 10 distinct blocks to mimic loading bars in retro games.