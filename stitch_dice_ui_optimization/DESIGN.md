---
name: Stellar Play System
colors:
  surface: '#f6fafe'
  surface-dim: '#d6dade'
  surface-bright: '#f6fafe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4f8'
  surface-container: '#eaeef2'
  surface-container-high: '#e4e9ed'
  surface-container-highest: '#dfe3e7'
  on-surface: '#171c1f'
  on-surface-variant: '#454651'
  inverse-surface: '#2c3134'
  inverse-on-surface: '#edf1f5'
  outline: '#767683'
  outline-variant: '#c6c5d3'
  surface-tint: '#4858ab'
  primary: '#4352a5'
  on-primary: '#ffffff'
  primary-container: '#5c6bc0'
  on-primary-container: '#f8f6ff'
  inverse-primary: '#bac3ff'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fdd34d'
  on-secondary-container: '#725b00'
  tertiary: '#00645d'
  on-tertiary: '#ffffff'
  tertiary-container: '#007f77'
  on-tertiary-container: '#d7fff9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bac3ff'
  on-primary-fixed: '#00105b'
  on-primary-fixed-variant: '#2f3f92'
  secondary-fixed: '#ffe087'
  secondary-fixed-dim: '#ebc23e'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#8ef4e9'
  tertiary-fixed-dim: '#71d7cd'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#00504a'
  background: '#f6fafe'
  on-background: '#171c1f'
  surface-variant: '#dfe3e7'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  body-lg:
    fontFamily: Quicksand
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-bold:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The brand personality is high-energy, whimsical, and nurturing. It aims to transform the technical nature of tabletop gaming into a playground of imagination suitable for children and families. The UI should evoke a sense of "digital toys"—interfaces that feel tactile, safe to touch, and exciting to explore.

The design style is **Modern Kid-core**. This is characterized by exaggerated roundedness, "squishy" tactile buttons, and a vibrant, candy-coated aesthetic. It avoids the clutter of traditional brutalism in favor of a polished, soft-ui approach that uses depth and color to guide young users through game mechanics.

## Colors

This design system uses a "Joyful Galactic" palette. 

- **Primary (Cosmic Indigo):** Retained for brand continuity, used for core navigational elements and primary actions to ground the design.
- **Secondary (Sunny Yellow):** Used for "winning" moments, critical alerts, and primary dice roll buttons to draw immediate attention.
- **Tertiary (Mint Nebula):** Used for success states, healing actions, and secondary progress indicators.
- **Accent (Coral Comet):** Used for destructive actions or high-energy modifiers, providing a warm contrast to the indigo.
- **Neutral (Cloud Base):** A soft, slightly blue-tinted off-white used for backgrounds to reduce eye strain and make vibrant colors pop without harsh contrast.

## Typography

Typography is focused on maximum legibility and friendliness. **Plus Jakarta Sans** provides a modern, geometric foundation for headings with a naturally "bouncy" feel in its heavier weights. **Quicksand** is used for all functional text; its rounded terminals mimic handwriting and feel approachable for early readers.

All font weights are skewed heavier than standard apps (minimum 500) to ensure text remains legible against vibrant background colors and within high-radius containers.

## Layout & Spacing

The layout philosophy is **Fluid & Generous**. We utilize a dynamic grid with extra-wide gutters (20px) to prevent the UI from feeling cramped. 

- **Mobile:** Single column focus with large tap targets. Margins are kept at 16px to maximize the play area while keeping elements away from screen edges.
- **Desktop/Tablet:** A max-width container of 1024px is recommended to keep game controls within easy reach. Elements should reflow into cards that look like physical game board pieces.
- **Rhythm:** Spacing follows an 8px base unit, but "Large (40px)" and "Extra Large (64px)" increments are preferred for top-level sections to maintain the airy, playful feel.

## Elevation & Depth

This design system eschews harsh, realistic shadows for **Soft Tactile Depth**. 

- **Level 1 (Surface):** The background is flat and neutral.
- **Level 2 (Cards):** Use very soft, large-spread shadows (0px 8px 24px) with a hint of the primary color's hue (e.g., a faint indigo tint in the shadow) to make containers appear "floating."
- **Level 3 (Buttons/Interactive):** Use a "faux-3D" effect. Instead of standard shadows, use a 4px bottom border in a darker shade of the button's background color to create a "pressable" toy button look.
- **Active States:** When pressed, buttons should shift 2px downward and lose their bottom border, simulating a physical mechanical click.

## Shapes

The shape language is **Ultra-Rounded**. There are no sharp corners in this design system.

- **Standard Elements:** Use a minimum radius of 1rem (16px).
- **Cards and Large Containers:** Use `rounded-xl` (48px) to give them a "pillowy" appearance.
- **Interactive Elements:** Buttons and input fields should be fully pill-shaped (capsule) where possible.
- **Icons:** Icons should feature rounded ends and thick strokes (2px minimum) to match the weight of the typography.

## Components

### Buttons
Primary buttons are large (minimum 56px height) and pill-shaped. They feature the faux-3D bottom shadow. Text inside is always bold. Use the Sunny Yellow for the main "Roll" button to make it the most attractive element on the screen.

### Dice Cards
Dice results are displayed on large, rounded-xl cards. Use a subtle gradient (e.g., White to Cloud Base) to give the cards a slight "sheen."

### Lists & Stats
Character stats should be housed in "Bubbles"—small, colorful capsules. Each stat (HP, Strength, etc.) should be associated with a unique vibrant color from the palette.

### Input Fields
Inputs should have a thick 2px border in a soft grey, turning Primary Indigo when active. The corners should be fully rounded. Use large placeholder text to assist younger users.

### Playful Accents
Incorporate "Stellar Stickers"—small, non-interactive illustrations of stars, planets, or 20-sided dice with smiley faces—tucked into the corners of cards or floating in the background to reinforce the kid-core theme.