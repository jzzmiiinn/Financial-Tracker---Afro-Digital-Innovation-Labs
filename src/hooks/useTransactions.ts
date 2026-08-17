import { useState, useEffect } from "react";
import type { Transaction } from "../components/Transactions/TransactionRow";

const STORAGE_KEY = "afrodigital-financial-tracker";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (
    data: Omit<Transaction, "id"> & { amount: number | string },
  ) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      date: data.date,
      type: data.type,
      amount: Number(data.amount),
      category: data.category,
      description: data.description || "",
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updates } : tx)),
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
