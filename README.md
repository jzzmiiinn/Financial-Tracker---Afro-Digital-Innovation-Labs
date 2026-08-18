# Financial Tracker - Afro Digital Innovation Labs

A modern web application for personal finance management, built with **React**, **TypeScript**, and **Vite**. It helps users track income and expenses with real-time filtering, persistent local storage, and an intuitive user interface.

## Tech Stack

* **Framework:** [React](https://react.dev/) with Hooks (`useState`, `useMemo`, Custom Hooks)
* **Language:** [TypeScript](https://www.typescriptlang.org/) for strict type safety
* **Build Tool:** [Vite](https://vite.dev/) with Hot Module Replacement (HMR)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
* **Linting:** ESLint with type-aware rules

## Features

* **Financial Dashboard:** View total balance, income, and expenses through reusable summary components.
* **Transaction Management:** Add, edit, and delete transactions using interactive modals and confirmation prompts.
* **Advanced Filtering:** Filter transactions by type (Income or Expense) and dynamically extracted categories.
* **Data Persistence:** All transactions are automatically saved to `localStorage` for seamless data persistence after page reloads.
* **Type Safety:** Centralized TypeScript definitions ensure robust component props and state contracts.

## Project Structure

```text
public/
└── favicon.ico

src/
├── assets/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   └── SummaryCard.tsx
│   ├── Filters/
│   │   └── FilterBar.tsx
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   ├── Transactions/
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionRow.tsx
│   │   └── TransactionTable.tsx
│   └── UI/
│       └── Modal.tsx
├── constants/
│   └── categories.ts
├── hooks/
│   ├── useFilters.ts
│   └── useTransactions.ts
├── types/
│   └── index.ts
├── utils/
│   ├── calculations.ts
│   ├── formatters.ts
│   └── storage.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

## Getting Started

### Prerequisites

* **Node.js** v18 or higher
* **npm** or **Yarn**

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/jzzmiiinn/Financial-Tracker---Afro-Digital-Innovation-Labs.git
cd Financial-Tracker---Afro-Digital-Innovation-Labs
```

#### 2. Install dependencies

```bash
npm install
```

Or:

```bash
yarn install
```

#### 3. Start the development server

```bash
npm run dev
```

Or:

```bash
yarn dev
```

#### 4. Open the application

Open the URL displayed in your terminal, typically:

```text
http://localhost:5173
```

## Available Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Starts the development server with HMR        |
| `npm run build`   | Compiles TypeScript and builds for production |
| `npm run preview` | Locally previews the production build         |
| `npm run lint`    | Runs ESLint with type-aware rules             |

## Architecture Highlights

### `utils/storage.ts`

Encapsulates reading from and writing to `localStorage`, keeping persistence logic separate from React components.

### `utils/calculations.ts`

Contains reusable numerical logic for calculating:

* Total balance
* Total income
* Total expenses
* Financial statistics

### `hooks/useTransactions.ts`

Manages transaction state and CRUD operations, including:

* Adding transactions
* Editing transactions
* Deleting transactions
* Persisting transaction data

### `hooks/useFilters.ts`

Handles filtering state and allows transactions to be filtered by:

* Transaction type
* Category

## Data Persistence

The application uses the browser's **Local Storage API** to persist transaction data.

Transactions remain available after:

* Refreshing the page
* Closing and reopening the browser
* Restarting the development server

> Note: Local storage is browser-specific and does not provide cloud synchronization between devices.

## Type Safety

TypeScript is used throughout the application to provide:

* Strongly typed transaction data
* Type-safe component props
* Type-safe custom hooks
* Better development-time error detection
* Improved code maintainability

Centralized types are stored in:

```text
src/types/index.ts
```

## License

This project is open source and available under the **MIT License**.
