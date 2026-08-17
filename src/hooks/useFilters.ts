import { useState, useMemo } from "react";
import type { Transaction, TypeFilter } from "../types";

export function useFilters(transactions: Transaction[]) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(transactions.map((t) => t.category)));
    return unique.sort();
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = typeFilter === "All" || tx.type === typeFilter;
      const matchesCategory = !categoryFilter || tx.category === categoryFilter;
      return matchesType && matchesCategory;
    });
  }, [transactions, typeFilter, categoryFilter]);

  const clearFilters = () => {
    setTypeFilter("All");
    setCategoryFilter("");
  };

  return {
    typeFilter,
    categoryFilter,
    categories,
    filteredTransactions,
    setTypeFilter,
    setCategoryFilter,
    clearFilters,
  };
}
