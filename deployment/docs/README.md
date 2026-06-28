# Smart Pilgrim Companion Documentation

This folder contains Mermaid-based documentation assets for the final academic project submission and presentation generation.

## Purpose

The documentation explains the architecture, deployment workflow, and user journey for:

**Smart Pilgrim Companion — Cloud-Based Spiritual Travel & Temple Assistance Platform Using AWS**

These files are intended for academic reports, project demonstrations, and PPT diagram export.

## Files

- `architecture/system_architecture.md` - system architecture diagram and benefits.
- `diagrams/deployment_flow.md` - deployment lifecycle workflow.
- `diagrams/user_journey.md` - pilgrim user journey flow.

## Rendering Diagrams

Mermaid diagrams can be previewed using any Mermaid-compatible viewer:

- GitHub markdown preview
- VS Code with a Mermaid preview extension
- Mermaid Live Editor
- Markdown preview tools that support Mermaid

## Export Instructions

To export diagrams for PPT generation:

1. Open the markdown file in a Mermaid-compatible preview tool.
2. Render the Mermaid diagram.
3. Export the diagram as PNG or SVG.
4. Insert the exported image into the final presentation slides.

Recommended online option:

- Mermaid Live Editor: https://mermaid.live/

Recommended local option:

```bash
npx @mermaid-js/mermaid-cli -i deployment/docs/architecture/system_architecture.md -o system_architecture.svg
npx @mermaid-js/mermaid-cli -i deployment/docs/diagrams/deployment_flow.md -o deployment_flow.svg
npx @mermaid-js/mermaid-cli -i deployment/docs/diagrams/user_journey.md -o user_journey.svg
```
