# Testing Guide

## Running Tests
From the project root:
```bash
cd codebase
npm test
```

## Running Build
```bash
cd codebase
npm run build
```

## PRD Must-Have Coverage
- **Task Management (add/edit/delete, calendar interaction)** → `src/tests/calendar.test.tsx`
- **Goal Setting with themed categories** → `src/tests/goals.test.tsx`
- **User-defined Categories (tasks & goals)** → `src/tests/categories.test.tsx`
- **Progress Tracking Dashboard (today/week/month/year)** → `src/tests/dashboard.test.tsx`
