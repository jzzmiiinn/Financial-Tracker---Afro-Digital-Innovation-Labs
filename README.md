# Financial Tracker - Afro Digital Innovation Labs

A modern web application for personal finance management, built with **React**, **TypeScript**, and **Vite**. It helps you track income and expenses with real-time filtering, persistent local storage, and an intuitive user interface.

---

## Tech Stack

- **Framework**: [React](https://react.dev/) with Hooks (`useState`, `useMemo`, Custom Hooks)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type safety
- **Build Tool**: [Vite](https://vitejs.dev/) with Hot Module Replacement (HMR)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Linting**: ESLint with type-aware rules

---

## Features

- **Financial Dashboard**: View total balance, income, and expenses through reusable summary components.
- **Transaction Management**: Add, edit, and delete transactions using interactive modals and confirmation prompts.
- **Advanced Filtering**: Filter transactions by type (Income or Expense) and dynamically extracted categories.
- **Data Persistence**: All transactions are automatically saved to `localStorage` for seamless reloads.
- **Type Safety**: Centralized TypeScript definitions ensure robust component props and state contracts.

---

## Project Structure
public/
└── favicon.ico

src/
├── assets/ # Static assets (images, icons)
├── components/
│ ├── Dashboard/
│ │ ├── Dashboard.tsx # Main balance and overview panel
│ │ └── SummaryCard.tsx # Metric card display component
│ ├── Filters/
│ │ └── FilterBar.tsx # Filter controls for type and category
│ ├── Layout/
│ │ ├── Header.tsx # Top navigation bar and action triggers
│ │ └── Layout.tsx # App frame and layout wrapper
│ ├── Transactions/
│ │ ├── TransactionForm.tsx # Modal form for adding/editing transactions
│ │ ├── TransactionRow.tsx # Table row renderer
│ │ └── TransactionTable.tsx# Table listing transactions
│ └── UI/
│ └── Modal.tsx # General-purpose reusable modal overlay
├── constants/
│ └── categories.ts # Predefined expense/income category constants
├── hooks/
│ ├── useFilters.ts # Filtering state management
│ └── useTransactions.ts # Transaction state & CRUD hook
├── types/
│ └── index.ts # Global TypeScript definitions
├── utils/
│ ├── calculations.ts # Math logic for totals, balances, and stats
│ ├── formatters.ts # Currency and date formatters
│ └── storage.ts # LocalStorage helper functions
├── App.css
├── App.tsx # Main application orchestrator
├── index.css # Tailwind directive imports
└── main.tsx # React entry point

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jzzmiiinn/Financial-Tracker---Afro-Digital-Innovation-Labs.git
   cd Financial-Tracker---Afro-Digital-Innovation-Labs
Install dependencies

bash
npm install
# or
yarn install
Start the development server

bash
npm run dev
# or
yarn dev
Open your browser and navigate to http://localhost:5173 (or the URL shown in your terminal).

Available Scripts
Command	Description
npm run dev	Starts the development server with HMR
npm run build	Compiles TypeScript and builds for production
npm run preview	Locally previews the production build
npm run lint	Runs ESLint with type-aware rules
Architecture Highlights
utils/storage.ts: Encapsulates reading from and writing to localStorage for persistent transaction state.

utils/calculations.ts: Keeps numerical logic (totals, summaries) decoupled from React components.

hooks/useFilters.ts & hooks/useTransactions.ts: Isolate custom state logic from UI rendering for better testability.

License
This project is open source and available under the MIT License.

text

---

### Key Changes Made

1.  **Corrected Project Name**: Updated to "Financial Tracker - Afro Digital Innovation Labs" as per your repository.
2.  **Updated Tech Stack**: Added Vite as the build tool and clarified the use of ESLint with type-aware rules.
3.  **Fixed Repository URL**: Used the correct clone URL from your GitHub link.
4.  **Streamlined Content**: Removed generic template references and focused on your project's unique features.
5.  **Maintained Clarity**: Kept the professional, emoji-free format you requested with clear sections and tables.
