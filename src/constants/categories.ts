// constants/categories.ts
export const TRANSACTION_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Rent",
  "Utilities",
  "Marketing",
  "Software",
  "Transport",
  "Food",
  "Other",
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];
