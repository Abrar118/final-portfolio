---
name: Abrar Mahir Esam
description: A career drawn as a transit network, generated from its data and built as a lit enamel model.
colors:
  ground: "#e9ebe6"
  ground-deep: "#dcdfd7"
  ink: "#14171a"
  ink-soft: "#4a5057"
  rule-soft: "#b9bdb4"
  sign: "#101316"
  sign-ink: "#f4f5f1"
  sign-soft: "#b4b9b2"
  frame: "#0b0e11"
  on-line: "#ffffff"
  line-M: "#8b2fc9"
  line-F: "#f5b400"
  line-J: "#007f4e"
  line-T: "#1447d6"
  line-R: "#d6330f"
  line-A: "#c81f75"
  focus-ring: "hsl(224 83% 46%)"
  ground-night: "#0e1216"
  ground-deep-night: "#161b21"
  ink-night: "#f1f2ee"
  ink-soft-night: "#a9afa9"
  rule-soft-night: "#333a42"
  sign-night: "#000000"
  line-M-night: "#b56bff"
  line-F-night: "#ffc21a"
  line-J-night: "#19c37d"
  line-T-night: "#4d7cff"
  line-R-night: "#ff5a33"
  line-A-night: "#ff4fa3"
  focus-ring-night: "hsl(224 100% 65%)"
  plate-day: "#c4c6c0"
  zone-day: "#b4b7ad"
  drained-day: "#cdd0c8"
  plate-night: "#0d1115"
  zone-night: "#171c22"
  drained-night: "#2a3038"
  ring-night: "#050608"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3rem, 7.2vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: '"wdth" 104'
  page-title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3rem, 6vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: '"wdth" 105'
  poster-title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3rem, 5.4vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: '"wdth" 104'
  figure-lead:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.25rem, 9vw, 8rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontVariation: '"wdth" 106'
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.5rem)"
    fontWeight: 750
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: '"wdth" 108'
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: '"wdth" 106'
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: '"ss01"'
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 550
  station:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.15
  station-major:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 800
    lineHeight: 1.15
  data:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    letterSpacing: "-0.01em"
rounded:
  hairline: "2px"
  nav: "3px"
  control: "4px"
  frame: "6px"
  capsule: "10px"
  circle: "50%"
spacing:
  control-gap: "8px"
  sign-inset: "24px"
  page-end: "40px"
  rail-x: "44px"
  rail-x-narrow: "15px"
  gutter: "112px"
  gutter-narrow: "44px"
  section: "clamp(72px, 9vw, 136px)"
components:
  button-sign:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.frame}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  button-sign-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.sign-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  sign:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-ink}"
    padding: "22px 24px 26px"
  signbar:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-ink}"
    padding: "0 24px"
    height: "56px"
  signbar-link:
    backgroundColor: "transparent"
    textColor: "{colors.sign-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.nav}"
    padding: "0 12px"
    height: "40px"
  signbar-link-active:
    backgroundColor: "rgb(255 255 255 / 0.13)"
    textColor: "{colors.sign-ink}"
  line-button:
    backgroundColor: "{colors.line-T}"
    textColor: "{colors.on-line}"
    rounded: "{rounded.circle}"
    size: "44px"
  bullet:
    backgroundColor: "{colors.line-R}"
    textColor: "{colors.on-line}"
    rounded: "{rounded.circle}"
    size: "2rem"
  bullet-sm:
    size: "1.5rem"
  bullet-lg:
    size: "3.5rem"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "52px"
  frame:
    backgroundColor: "{colors.frame}"
    rounded: "{rounded.frame}"
    padding: "clamp(6px, 0.8vw, 12px)"
  map-ticket:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.control}"
    width: "300px"
  terminus:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-ink}"
---

# Design System: Abrar Mahir Esam

## Overview

**Creative North Star: "The Enamel Network"**

A career is a transit network you can read. Each stack is a line, each employer or project a station, each year a band across the ground. The map is generated from the site's data, so the 3D model, the flat diagram and the station links cannot disagree with one another or with the content. The visual system is the working vocabulary of a transit authority: pale enamel ground, black signs, seven saturated line colours, white station capsules, round lettered bullets.

Density is high on the map and in the record tables, then loosens into full-bleed colour posters and display-scale figures. Hierarchy comes from size, width and rules, not from containers. Night is the same system underground: every role survives the switch, with brighter line colours, a black sign and a dark plate.

The enamel is a direction the build has only partly reached. Tracks and stations are extruded, bevelled, clearcoated solids on a lit plate. The plate shows sheen but no visible panel edge, because it is a 1600-unit plane running past every frame. The sign's enamel finish is only a top-lit gradient. Both are open items, not finished material.

**Key Characteristics:**
- Seven line colours that each mean one stack, in every medium the site uses.
- Black signs carrying the name, navigation and the end of every page.
- One unbroken route line and a sticky train down each long page.
- Archivo at slightly extended widths throughout; Geist Mono only for data.
- A real-time model that loads after a flat SVG of the same map, which stays complete without WebGL or motion.

## Colors

The palette is neutral enamel and black signage, with all saturation held by the seven lines.

### Primary
- **Sign Black** (sign): The top bar, the mobile dock, the station sign at the foot of each map, the hover ticket and the footer. At night it goes to pure black.
- **Sign Ink** (sign-ink) and **Sign Soft** (sign-soft): Primary and secondary text on black. Sign Ink also fills the main button on a sign.

### Secondary
The seven lines, each with a fixed meaning and a Day and Night value.
- **Research Violet** (line-M): ML & Research. Fills the Research section on the About page.
- **Signal Yellow** (line-F): Flutter. The only Day line carrying dark text.
- **Interchange Green** (line-J): Java & Spring.
- **Career Black** (ink, then ink-night): Career, line C. It has no token of its own in this file because it is the current ink.
- **Express Blue** (line-T): TypeScript & React.
- **Rust Red** (line-R): Rust.
- **Algorithm Magenta** (line-A): Algorithms.

On Day, line text is On-Line White except on Signal Yellow, which uses Ink. At night all seven lines carry Frame Black text. In the 3D scene on Day, line A renders a slightly different magenta (`#d6247f`) than the CSS token; this is unresolved drift, and the token above is the system value.

### Neutral
- **Vitreous Ground** (ground): The page, and the halo stroked around map names.
- **Deep Ground** (ground-deep): Alternate year bands on the flat map, the gallery section, the focused row in the work list.
- **Ink** (ink) and **Soft Ink** (ink-soft): Text and heavy rules; dates, descriptions and secondary lines.
- **Soft Rule** (rule-soft): Only the light dividers between work rows.
- **Frame Black** (frame): The mount around every screenshot.
- **Station White** (on-line): Station capsule faces, stop markers on the route and the train body, in both themes.
- **Plate, Zone and Drained** (plate-day, zone-day, drained-day and their night values): Material colours for the 3D scene only. They are chosen to read correctly under the scene's lights, so they are darker than the CSS ground they stand in for. Do not use them in the DOM.

### Named Rules
**The Line Means A Stack Rule.** A line colour appears only where that stack or its project is the subject: the track, its bullet, its route on a project page, its poster field. Colour is never chosen for variety.

**The One Lit Line Rule.** Choosing a line keeps it at full colour and drains the rest: unpressed bullets drop to 45% opacity, flat map lines to 14%, and 3D tracks sink and blend most of the way to the Drained colour.

**The Career Inversion Rule.** Career is whatever the ink is, so it flips with its surface: inside a sign or ticket line C becomes light with dark text, and in lists on the ground it follows ink.

## Typography

**Display Font:** Archivo (variable width axis, with sans-serif fallback)
**Body Font:** Archivo (with sans-serif fallback)
**Label/Mono Font:** Geist Mono (with monospace fallback)

**Character:** One grotesque does all the speaking, widened and tightened as it grows, the way a signage alphabet does. Mono is a small factual aside, never a voice.

### Hierarchy
- **Display** (800, clamp 3rem to 6rem, 0.98): The name or page name on the sign. Project names step down to clamp 2.5rem to 5rem. Below 860px it is clamp 2.75rem to 4rem.
- **Page Title** (800, clamp 3rem to 5.25rem, 1): The Work index title, which has no sign.
- **Poster Title** (800, clamp 3rem to 5.25rem, 0.98): Project names on colour posters.
- **Lead Figure** (800, clamp 3.25rem to 8rem, 1): The lead proof figure on the home page. The second figure steps down to clamp 2.25rem to 4.25rem. Tabular numerals.
- **Terminus** (800, clamp 2.25rem to 6rem, 1): The footer's "Next stop" link.
- **Headline** (750, clamp 2rem to 3.5rem, 1.04, balanced): Section titles on the route.
- **Title** (750, 1.5rem, 1.15): Work rows; line names and career employers run this weight on their own fluid sizes.
- **Body** (400, 1.0625rem, 1.6): Running text, capped between 42ch and 68ch by context.
- **Label** (550 to 650, 0.9375rem): Navigation, buttons, form labels. Always sentence case.
- **Station** (600, 0.8125rem, 1.15) and **Station Major** (800, 0.9375rem): Names on the map, 0.75rem and 0.8125rem on phones.
- **Data** (Geist Mono, 0.875rem, tabular numerals): Dates, stop counts, years on the map, hotkeys, inline code.

### Named Rules
**The Signage Width Rule.** Display and headline settings run at widths from 104% to 110% with negative tracking that grows with size. Body stays at normal width.

**The Mono Is Data Rule.** Geist Mono is for dates, counts, keys and code. Proof figures such as "1,000+ users" are display Archivo with tabular numerals.

**The Map Slant Rule.** On the wide map every name sits at one angle (-34deg), on one of two opposing sides of its stop, stroked with a 3px ground halo. If no clean position exists, a major name moves clear on a 1.5px leader and a minor one waits for hover. Tall and on-end views set names horizontally.

## Layout

Every page but Work has the same order: a fixed map backdrop, a black sign at the foot of a tall viewport, then an opaque route section that scrolls over the map. The sign is 100svh on Home, 92svh on About and project pages, and 42svh (minimum 320px, 46svh on phones) on Contact. The sign bar is fixed at 56px; below 860px its links move to a four-part dock at the foot of the screen.

Route content sits in a wrap up to 1560px with a left gutter that clears the route line (112px, 44px on phones). Sections breathe at 72px to 136px. Inner grids are deliberately uneven: 5:7 posters that swap sides on alternate sections, 7:6 role rows, 3:9 career rows, 7:4 contact. All collapse to one column at 860px.

Work inverts the pattern: a ruled list up to 760px (48vw) on the left with the whole map turned on end in the space beside it. Below 1024px the map takes the first 48svh and the list follows beneath. This page has no route line or train.

### Named Rules
**The One Route Rule.** Long pages hang from one unbroken track at the 44px rail (15px on phones), 8px wide (6px on phones). Each section title is a stop on it, and a white train rides at 56vh of the viewport. Project pages run their route in the project's first line colour; other pages run in Career.

**The Clear Space Rule.** The sign measures its own top edge and reports it, and the camera, flat map and label placement all frame the map inside what remains. Nothing on the map sits under a sign.

## Elevation & Depth

Depth is mostly physical and comes from the 3D scene: a perspective camera at 26 degrees, one soft-shadow directional light, a hemisphere fill and a dim room reflection. Tracks and stations stand on the plate and cast real shadows. On the page itself surfaces are flat and depth comes from opaque sections scrolling over the fixed map.

The enamel is uneven in finish. Tracks and capsules carry full clearcoat and read as glazed solids. The plate has clearcoat and sheen at Day and very little at night, but no visible panel edge, fixing or thickness. The sign's enamel is a single top-lit gradient over the black with a 1px light top edge. Treat both as the current state, not as the finished treatment to copy.

### Shadow Vocabulary
- **Hung frame** (`box-shadow: 0 24px 50px -18px rgb(0 0 0 / 0.5)`): Screenshot frames.
- **Hover ticket** (`box-shadow: 0 18px 40px -12px rgb(0 0 0 / 0.45)`): The station ticket over the map.
- **Train** (`box-shadow: 0 8px 18px -6px rgb(0 0 0 / 0.4)`): The sticky train on the route.
- **Track clearance** (`box-shadow: 0 0 0 2px var(--ground)`): A ground-coloured keyline separating the route line from what it crosses.
- **Pressed bullet** (`box-shadow: 0 0 0 3px var(--ground), 0 0 0 5px var(--line)`): A gapped ring in the line's own colour.

### Named Rules
**The Hung Objects Rule.** Only objects that hang over something cast a soft shadow: frames, the ticket, the train. Signs, rows, fields and buttons do not.

## Shapes

Two families, kept apart. The network's own parts are round: circular bullets and line buttons, full-radius station capsules that stretch across the lines they serve, a 10px-radius train, a ring for the terminus. Everything built by hand is nearly square: controls at 4px, nav items at 3px, frames at 6px with 2px on the image inside. Posters and signs are full-bleed and square. Poster frames drop their bottom corners and run off the section's foot.

Division is by rule: 1.5px ink rules above each row of content, a 6px rule in the line's colour above each line row, a 1px soft rule only between work rows. The route line and flat tracks use filleted corners on a 45-degree-based geometry.

### Named Rules
**The Round Means Network Rule.** A full circle or capsule marks a part of the network: a line, a station or a train. The one exception is the home sign's portrait, set in a station ring because it sits with the name. A generic control does not get one.

## Components

### Buttons
Direct and physical, with a small lift.
- **Shape:** Nearly square (4px), minimum height 46px, 18px side padding, weight 650, with a trailing arrow icon where it leaves or advances.
- **Sign:** Sign Ink fill with Frame Black text, the main action on black.
- **Sign Quiet:** Transparent with an inset 1.5px white line at 50%, going full Sign Ink on hover.
- **Ink:** Ink fill with Ground text, used for the contact form's send action.
- **Hover / Focus:** Lifts 2px on the long ease-out. Focus is a 3px ring offset 3px, shared by the whole site. Disabled drops to 60% with a wait cursor.

### Line Bullets and Picker
The signature control. A bullet is a circle in the line's colour holding its letter, at 1.5rem, 2rem or 3.5rem. In the picker they are 44px buttons (40px on phones) that lift 3px on hover. Pressed lifts and scales 1.08 with the gapped ring, and the others dim. The letter key does the same anywhere on the site. Next to the row, a live note names the line and its stops; it is hidden on phones.

### The Sign
A full-width black panel at the foot of the map, with the name at display scale and a 280 to 420px aside holding one sentence and the actions. On phones it stacks and adds bottom padding to clear the dock. It wipes in from the left over 0.8s on load. Its enamel finish is an open item (see Elevation & Depth).

### Navigation
- **Sign bar:** Name at left, four links centred with mono hotkeys 1 to 4, then Résumé, a 3D/flat toggle and a theme toggle. Links are Sign Soft, going to Sign Ink on hover; the current page adds a 13% white fill.
- **Dock:** Below 860px, four equal 56px cells on black with the same active fill and safe-area padding.

### Station Labels and Ticket
Station names are real links positioned over the map, with a 32px circular hit area (44px on phones). Major stops are heavier; the two proof stations also carry their figure. On a pointer device, hovering or focusing a stop on the overview shows a 300px black ticket at the upper right with the screenshot, bullets, year and description. Hidden below 860px and on coarse pointers.

### Posters
Full-bleed sections in a line's colour, with a poster-scale title, bullets and year, a short note, and a framed screenshot rising from the section's foot. The frame lifts 10px on hover.

### Inputs / Fields
- **Style:** Transparent fill, 1.5px rule border, 4px radius, 52px tall, 1.0625rem text; text areas start at 140px. Labels sit above at weight 650.
- **Focus:** The shared 3px ring. The caret is Rust Red.

### Record Rows
Career stops, research, contests, education, line rows and work rows all use the same device: a top rule, generous block padding, a strong title and Soft Ink detail, with no card around it. Work rows take Deep Ground when focused.

### Terminus
Every page ends on a black band with a hollow ring and a display-scale "Next stop" link to Contact. On hover the ring fills and the arrow moves 10px.

### Motion
The shared ease is a long ease-out, `cubic-bezier(0.16, 1, 0.3, 1)`. Colour changes take 0.15s, lifts 0.2 to 0.5s. On load the flat map gives way to the model as it rises and tilts up. Choosing a line raises it and drains the others, and a focused stop lifts while the camera flies to it. Reduced motion removes the transitions, the rise and the trains, leaving a still model or the flat map.

## Do's and Don'ts

### Do:
- **Do** use a line colour only for its stack, and fill a whole section with it when that stack's work is the subject.
- **Do** run body text and signage in Archivo, and save Geist Mono for dates, counts, keys and code.
- **Do** keep the flat map complete: every station link and every page must work with WebGL or motion off.
- **Do** generate anything drawn on the map from `data/network.ts` so the model stays an accurate index.
- **Do** separate content with 1.5px rules and open space.
- **Do** hang screenshots in Frame Black mounts with the Hung Frame shadow.
- **Do** end each page on the black terminus with the route to Contact.

### Don't:
- **Don't** give text content a card, tinted tile or bordered panel. The only floating text panel is the map's ticket.
- **Don't** use circles or capsules for generic controls, or square off a bullet or station.
- **Don't** add a small label above a heading. Above a name there may be a working control, such as the picker or the back link, and nothing else.
- **Don't** set labels in uppercase or wide tracking; the system is sentence case throughout.
- **Don't** add a soft shadow to signs, rows, buttons or fields.
- **Don't** add ornamental map marks with no station or year behind them.
- **Don't** treat the sign's gradient or the plate's sheen as finished enamel to reproduce on new surfaces.
