# PPT Design Guide

## Theme Direction

The presentation should feel like a premium academic cloud project deck with a spiritual travel identity. It should not look like a generic blue corporate presentation.

Design keywords:

- Light
- Calm
- Premium
- Minimal
- Cloud-ready
- Temple-inspired
- High-readability
- Evidence-driven

## Palette Sources

### Extracted From Frontend

The actual frontend theme uses:

| Token | Color | Usage |
| --- | --- | --- |
| App background | `#FAFAFA` | Slide background |
| Primary blue | `#2D5BFF` | Cloud/data accent, thin lines |
| Saffron | `#FF7A00` | Highlight, active markers |
| Gold | `#D4AF37` | Premium temple accent |
| Forest | `#3A7D44` | Success/testing accent |
| Ink | `#222222` | Main text |
| Muted | `#5F6368` | Supporting text |
| Soft warm card | `#FFF7E6` | Subtle cards |

### Extracted From Logo

Logo path:

`C:/Users/DELL/Documents/bhargav-dev/smart-pilgrim-companion/frontend/public/assets/images/SmartPiligrimCompanionLogo.png`

Extracted dominant logo tones:

| Color | Interpretation |
| --- | --- |
| `#FFFFF0` | Ivory logo background tone |
| `#FFF0E0` | Warm cream tone |
| `#FFF0D0` | Soft devotional warmth |
| `#000010` | Midnight ink |
| `#002040` | Deep navy |
| `#004060` | Deep teal-blue |

## Final Presentation Palette

Use this combined palette:

| Role | Color |
| --- | --- |
| Background | `#FAFAFA` |
| Surface/card | `#FFFFFF` |
| Warm surface | `#FFF7E6` |
| Main text | `#222222` |
| Muted text | `#5F6368` |
| Cloud accent | `#2D5BFF` |
| Temple accent | `#FF7A00` |
| Premium accent | `#D4AF37` |
| Success accent | `#3A7D44` |
| Logo dark | `#002040` |

## Typography

Match the frontend identity:

- Display headings: **Cormorant Garamond** or Georgia fallback.
- Body text: **Manrope** or Segoe UI fallback.

Recommended slide sizes:

- Main title: 52-64 pt
- Slide title: 34-42 pt
- Section labels: 18-22 pt
- Body text: 18-24 pt
- Caption text: 11-13 pt

## Layout System

Use a consistent 12-column widescreen grid.

Margins:

- Left/right: 0.65 in
- Top: 0.45 in
- Bottom: 0.4 in

Cards:

- White or warm surface.
- Radius: 8 px.
- Border: `rgba(45, 91, 255, 0.12)`.
- Shadow: very soft, no heavy drop shadows.
- Avoid nested cards.

## Visual Style

- Use large screenshots, not small cluttered thumbnails.
- Use one main visual per slide when possible.
- Prefer soft dividers and thin lines over heavy boxes.
- Use saffron/gold for spiritual identity and blue only for cloud/architecture paths.
- Use forest green only for successful validation/result markers.
- Keep slide text short and let speaker notes carry detail.

## Icon Style

Use consistent line icons if icons are added during PPT creation:

- Search: temple search
- Map: travel/planner
- Cloud: AWS deployment
- Database: RDS
- Shield: IAM
- Activity: CloudWatch/testing
- Users: team contributions

## Diagram Style

Mermaid diagrams should use:

- Light nodes
- Rounded rectangles
- Thin blue edges for cloud flow
- Saffron/gold edge highlights for user journey
- Green status accents for testing/results

Avoid overcrowding diagrams. Slide 4 architecture should be the most polished diagram.

## Screenshot Treatment

- Use full-width screenshots when they prove UI quality.
- Use split-screen for GitHub vs AWS.
- Use a 3-image evidence strip for development/testing slides.
- Add short captions below screenshots.
- Do not over-annotate screenshots.

## Animation Guidelines

Use subtle transitions only:

- Cover: logo fade in.
- Problem slide: pain cards appear one by one.
- Solution flow: reveal left-to-right.
- Architecture: reveal by layers: Frontend, Nginx, Flask, RDS, side services.
- Timeline: reveal phase by phase.
- Team: reveal cards together or in a gentle cascade.

Avoid spinning, bouncing, or dramatic transitions.

## Slide Footer

Small footer on slides 2-10:

`Smart Pilgrim Companion | AWS Cloud Project`

Use muted text at 10-11 pt.

## Mandatory Assets

- Smart Pilgrim logo:
  `C:/Users/DELL/Documents/bhargav-dev/smart-pilgrim-companion/frontend/public/assets/images/SmartPiligrimCompanionLogo.png`
- Evidence screenshots:
  `C:/Users/DELL/Documents/ProjectProofs/`
- VVIT logo:
  `[Insert VVIT Logo]` placeholder unless a final institutional logo is supplied.
