import React from "react";

interface SummaryCardProps {
  title: string;
  amount: number;
  type: "income" | "expense" | "balance";
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
  const formatted = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));

  const styles = {
    income: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      amount: "text-emerald-600",
      border: "border-emerald-100",
    },
    expense: {
      bg: "bg-red-50",
      text: "text-red-700",
      amount: "text-red-600",
      border: "border-red-100",
    },
    balance: {
      bg: "bg-blue-50",
      text: "text-[#007BFF]",
      amount: amount >= 0 ? "text-[#007BFF]" : "text-red-600",
      border: "border-blue-100",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`rounded-2xl border ${style.border} ${style.bg} p-5 shadow-sm`}
    >
      <p className={`text-sm font-medium ${style.text}`}>{title}</p>
      <p
        className={`mt-2 text-2xl font-semibold tracking-tight ${style.amount}`}
      >
        {type === "balance" && amount < 0 ? "−" : ""}
        {type === "income" ? "+" : type === "expense" ? "−" : ""}
        {formatted}
      </p>
    </div>
  );
};

export default SummaryCard;
