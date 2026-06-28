# Documentation README

This folder contains the complete Markdown documentation for:

**Smart Pilgrim Companion: Cloud-Based Spiritual Travel & Temple Assistance Platform Using AWS**

## Purpose

The files in `docs/documentation/` are prepared for final academic submission and PPT/report generation. They use clean Markdown, Mermaid diagrams, and screenshot placeholders that reference the real evidence files under `deployment/ProjectProofs/`.

## Convert Markdown to DOCX

Recommended tool: Pandoc.

Example command for a single combined report:

```bash
pandoc docs/documentation/00_cover_page.md docs/documentation/01_certificate.md docs/documentation/02_declaration.md docs/documentation/03_acknowledgement.md docs/documentation/04_abstract.md docs/documentation/05_table_of_contents.md docs/documentation/chapter_1_introduction.md docs/documentation/chapter_2_problem_statement.md docs/documentation/chapter_3_methodology.md docs/documentation/chapter_4_technology_stack.md docs/documentation/chapter_5_system_design.md docs/documentation/chapter_6_implementation.md docs/documentation/chapter_7_aws_deployment.md docs/documentation/chapter_8_testing_and_results.md docs/documentation/chapter_9_team_contributions.md docs/documentation/chapter_10_conclusion.md docs/documentation/chapter_11_future_scope.md docs/documentation/references.md docs/documentation/appendix.md -o Smart_Pilgrim_Companion_Project_Report.docx
```

## Convert DOCX to PDF

Open the generated `.docx` file in Microsoft Word, LibreOffice, or Google Docs and export it as PDF.

LibreOffice command-line example:

```bash
libreoffice --headless --convert-to pdf Smart_Pilgrim_Companion_Project_Report.docx
```

## Render Mermaid Diagrams

Markdown viewers that support Mermaid can render diagrams directly. Recommended options:

- GitHub Markdown preview
- VS Code Mermaid preview extension
- Mermaid Live Editor
- Mermaid CLI

Mermaid CLI example:

```bash
npx @mermaid-js/mermaid-cli -i docs/documentation/chapter_5_system_design.md -o system_design.svg
```

## Screenshot Placement

Replace each placeholder with the corresponding screenshot from:

```text
deployment/ProjectProofs/
```

Example placeholder:

```text
[INSERT IMAGE:
aws_deployment/homepage.png
Caption: AWS deployment home page.]
```
