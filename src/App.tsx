import React, { useState, useMemo } from "react";
import Layout from "./components/Layout/Layout";
import Modal from "./components/UI/Modal";
import TransactionForm from "./components/Transactions/TransactionForm";
import type { TransactionFormData } from "./components/Transactions/TransactionForm";
import TransactionTable from "./components/Transactions/TransactionTable";
import Dashboard from "./components/Dashboard/Dashboard";
import FilterBar from "./components/Filters/FilterBar";
import { useTransactions } from "./hooks/useTransactions";
import type { Transaction } from "./components/Transactions/TransactionRow";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions();

  // Filters
  const [typeFilter, setTypeFilter] = useState<"All" | "Income" | "Expense">(
    "All",
  );
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

  // Handlers
  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tx: Transaction) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: TransactionFormData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, {
        date: data.date,
        type: data.type,
        amount: Number(data.amount),
        category: data.category,
        description: data.description,
      });
    } else {
      addTransaction({
        date: data.date,
        type: data.type,
        amount: data.amount,
        category: data.category,
        description: data.description,
      });
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteTransaction(deleteId);
      setDeleteId(null);
    }
  };

  const clearFilters = () => {
    setTypeFilter("All");
    setCategoryFilter("");
  };

  return (
    <Layout onAddTransaction={openAddModal}>
      <div className="space-y-6">
        {/* Always show full totals */}
        <Dashboard transactions={transactions} />

        <FilterBar
          typeFilter={typeFilter}
          categoryFilter={categoryFilter}
          categories={categories}
          onTypeChange={setTypeFilter}
          onCategoryChange={setCategoryFilter}
          onClear={clearFilters}
        />

        <TransactionTable
          transactions={filteredTransactions}
          onEdit={openEditModal}
          onDelete={(id) => setDeleteId(id)}
        />
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        title={editingTransaction ? "Edit Transaction" : "Add New Transaction"}
      >
        <TransactionForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
          initialData={
            editingTransaction
              ? {
                  date: editingTransaction.date,
                  type: editingTransaction.type,
                  amount: String(editingTransaction.amount),
                  category: editingTransaction.category,
                  description: editingTransaction.description,
                }
              : undefined
          }
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Transaction"
      >
        <div className="space-y-6">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteId(null)}
              className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default App;
