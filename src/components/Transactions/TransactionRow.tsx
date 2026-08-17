import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export interface Transaction {
  id: string;
  date: string;
  type: "Income" | "Expense";
  amount: number;
  category: string;
  description: string;
}

interface TransactionRowProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const isIncome = transaction.type === "Income";

  const formattedAmount = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
  }).format(transaction.amount);

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50/80">
      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
        {formattedDate}
      </td>

      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isIncome
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {transaction.type}
        </span>
      </td>

      <td className="px-4 py-3.5 text-sm font-medium text-slate-800">
        {transaction.category}
      </td>

      <td className="max-w-[220px] truncate px-4 py-3.5 text-sm text-slate-500">
        {transaction.description || "—"}
      </td>

      <td
        className={`whitespace-nowrap px-4 py-3.5 text-right text-sm font-semibold ${
          isIncome ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {isIncome ? "+" : "−"}
        {formattedAmount}
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5 text-right">
        <div className="flex items-center justify-end gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(transaction)}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-[#007BFF]"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(transaction.id)}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;
