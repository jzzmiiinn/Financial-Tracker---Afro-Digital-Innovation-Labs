import React from "react";
import SummaryCard from "./SummaryCard";
import type { Transaction } from "../Transactions/TransactionRow";

interface DashboardProps {
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <SummaryCard title="Total Income" amount={totalIncome} type="income" />
      <SummaryCard
        title="Total Expenses"
        amount={totalExpenses}
        type="expense"
      />
      <SummaryCard title="Net Balance" amount={netBalance} type="balance" />
    </div>
  );
};

export default Dashboard;
