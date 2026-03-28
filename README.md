# 💰 Revenue Clarity

> Simplify complex business revenue metrics — calculate, understand, and present your financials with clarity.

[![License: MIT](https://img.shields.io/badge/License-MIT-7c6fff.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Status-Active-4fffb0)](.)

---

## What is Revenue Clarity?

Revenue Clarity is a tool built for **founders, operators, and business owners** who want to understand their numbers without an MBA. Enter your raw business data and instantly get clean breakdowns of key revenue metrics — from gross margin and MRR to CAC, LTV, burn rate, and more.

No spreadsheet chaos. No jargon overload. Just your numbers, explained.

---

## ✦ Features

- **Revenue Metrics Calculator** — MRR, ARR, Gross Margin, Net Profit, Burn Rate
- **Customer Metrics** — CAC, LTV, LTV:CAC Ratio, Churn Rate
- **Plain English Explanations** — every metric explained in simple terms
- **Visual Breakdowns** — charts and summaries you can actually read
- **Export Ready** — download results as PDF or Excel
- **Zero fluff** — built for speed and clarity

---

## 📊 Metrics Covered

| Metric | Description |
|---|---|
| MRR / ARR | Monthly & Annual Recurring Revenue |
| Gross Margin | Revenue minus cost of goods sold |
| Net Profit | Bottom line after all expenses |
| Burn Rate | How fast you're spending cash |
| CAC | Cost to acquire one customer |
| LTV | Lifetime value of a customer |
| Churn Rate | % of customers lost per period |
| Break-even Point | When revenue covers all costs |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v20+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/revenue-clarity.git

# Navigate into the project
cd revenue-clarity

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Setup

```bash
# Copy the example env file
cp .env.example .env

# Fill in your values
nano .env
```

---

## 🗂 Project Structure

```
revenue-clarity/
├── src/
│   ├── calculators/     # Core metric calculation logic
│   ├── components/      # UI components
│   ├── utils/           # Helper functions
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
├── tests/               # Unit tests
├── .env.example         # Environment variable template
├── .gitignore
├── tsconfig.json
└── package.json
```

---

## 🧮 Usage Example

```typescript
import { calculateMRR, calculateLTV, calculateCAC } from './src/calculators'

const metrics = {
  monthlyRevenue: 50000,
  totalCustomers: 200,
  acquisitionCost: 5000,
  avgCustomerLifespan: 24, // months
}

const mrr = calculateMRR(metrics.monthlyRevenue)
const ltv = calculateLTV(metrics.monthlyRevenue / metrics.totalCustomers, metrics.avgCustomerLifespan)
const cac = calculateCAC(metrics.acquisitionCost, metrics.totalCustomers)

console.log(`MRR: ₹${mrr}`)
console.log(`LTV: ₹${ltv}`)
console.log(`CAC: ₹${cac}`)
console.log(`LTV:CAC Ratio: ${(ltv / cac).toFixed(2)}x`)
```

---

## 🛣 Roadmap

- [x] Core revenue metric calculators
- [x] Plain English explanations
- [ ] Interactive dashboard UI
- [ ] PDF & Excel export
- [ ] Multi-currency support
- [ ] Scenario comparison (best/worst/expected)
- [ ] Team collaboration features
- [ ] API endpoints for integrations

---

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

Built with intention. If this tool helped you understand your business better, give it a ⭐

---

<p align="center">
  <sub>Revenue Clarity — because every founder deserves to know their numbers.</sub>
</p>
