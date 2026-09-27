# Multi-CV Portfolio

A Vue 3 + Vite CV/portfolio where one data source can produce several career-oriented CV versions and multiple languages.

## 1. Install

```bash
npm install
```

## 2. Start

```bash
npm run dev
```

Open the local URL shown by Vite.

## 3. Build

```bash
npm run build
```

## Main features

- Vue 3 + Vite
- Swedish / English / Spanish / Arabic
- RTL layout for Arabic
- Career profiles:
  - Frontend Developer
  - UX/UI Designer
  - IT Educator / Teacher
  - Correctional Officer
- Print / Save as PDF
- Dark/light mode
- Data-driven projects, skills, experience and education
- Responsive design
- Small editor example

## Important data model

Edit `src/data.js`. Do not duplicate the entire CV for every profession. Keep common facts once, then use `roleProfiles` to decide:
- professional title
- skills to emphasize
- sections to show

## Recommended next development

1. Add a complete CV editor.
2. Save custom CV versions in localStorage.
3. Add photo upload.
4. Add PDF export.
5. Add JSON import/export.
6. Add a backend/database for multiple users.
7. Add authentication if other people should create their own CVs.
8. Add Figma-like theme settings.
9. Add ATS-friendly CV template.
# cv-portfolio
