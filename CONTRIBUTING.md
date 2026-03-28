# Contributing to Revenue Clarity

First off — thank you for taking the time to contribute. Every improvement, bug fix, or idea matters.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Commit Style](#commit-style)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

This project follows a simple rule: **be respectful, be constructive**. Criticism of code is welcome. Criticism of people is not.

---

## Getting Started

### 1. Fork the repository

Click **Fork** on the top-right of the GitHub page.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/revenue-clarity.git
cd revenue-clarity
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-description
```

### 5. Start the dev server

```bash
npm run dev
```

---

## How to Contribute

### Things we welcome

- **Bug fixes** — something broken? Fix it and open a PR.
- **New metrics** — a revenue/customer/financial metric that belongs here? Propose it.
- **Better benchmarks** — if industry benchmarks in the comments are outdated or wrong, update them.
- **UI improvements** — the dashboard can always be more clear and usable.
- **Tests** — more coverage is always welcome.
- **Documentation** — clearer explanations, better README sections, inline comments.
- **Translations** — multi-language support is on the roadmap.

### Things to discuss first

Before starting large changes (new calculator modules, architectural changes, major UI overhauls), open an **Issue** first so we can align before you invest time.

---

## Development Workflow

```bash
# Run the dev server
npm run dev

# Type-check without emitting
npm run typecheck

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm run test:coverage

# Lint your code
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format with Prettier
npm run format
```

All PRs must pass `typecheck`, `lint`, and `test` before merging.

---

## Commit Style

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

[optional body]
```

**Types:**

| Type       | When to use |
|---|---|
| `feat`     | New feature or metric |
| `fix`      | Bug fix |
| `docs`     | Documentation only |
| `refactor` | Code change that neither fixes nor adds |
| `test`     | Adding or updating tests |
| `chore`    | Build process, tooling, config |
| `style`    | Formatting only (no logic change) |

**Examples:**

```bash
git commit -m "feat: add net revenue retention calculator"
git commit -m "fix: churn rate returning NaN when totalCustomers is 0"
git commit -m "docs: add benchmark notes to LTV:CAC metric"
git commit -m "test: add edge case coverage for burnRate with zero opex"
```

---

## Pull Request Process

1. Make sure your branch is up to date with `main`
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Run the full check suite locally
   ```bash
   npm run typecheck && npm run lint && npm test
   ```

3. Push your branch and open a PR against `main`

4. Fill in the PR template:
   - What does this change?
   - Why is it needed?
   - How was it tested?
   - Screenshots (if UI change)

5. A maintainer will review within a few days. Be ready for feedback.

6. Once approved, your PR will be squash-merged into `main`.

---

## Reporting Bugs

Open an [Issue](https://github.com/YOUR_USERNAME/revenue-clarity/issues/new) and include:

- **What you expected** to happen
- **What actually happened**
- **Steps to reproduce** (with example inputs if it's a calculation bug)
- **Browser / Node version** if relevant

---

## Suggesting Features

Open an Issue with the label `enhancement` and describe:

- The metric or feature you want
- Why it's useful for business owners
- Any benchmark or formula reference

---

## Financial Accuracy

If you're adding or modifying calculators, please:

- Include the formula as a comment above the function
- Note the industry benchmark in the JSDoc or inline comment
- Add at least 2 unit tests — one normal case, one edge case (zero values, divide-by-zero, etc.)

**Example:**

```typescript
/**
 * Net Profit Margin
 * Formula: (Net Profit / Revenue) × 100
 * Benchmark: 10% = healthy, 20%+ = excellent
 */
export function calculateNetMargin(revenue: number, netProfit: number): number {
  if (revenue === 0) return 0
  return round((netProfit / revenue) * 100)
}
```

---

## Thank You

Every contribution — big or small — makes this tool more useful for business owners who deserve to understand their own numbers. We appreciate you.
