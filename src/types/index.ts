export type TransactionType = "Income" | "Expense";

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
}

export interface TransactionFormData {
  date: string;
  type: TransactionType;
  amount: string;
  category: string;
  description: string;
}

export type TypeFilter = "All" | TransactionType;
