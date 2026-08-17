import React, { useState, useEffect } from "react";

export interface TransactionFormData {
  date: string;
  type: "Income" | "Expense";
  amount: string;
  category: string;
  description: string;
}

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  onCancel: () => void;
  initialData?: TransactionFormData; // ← important
}

const categories = [
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
];

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date().toISOString().split("T")[0],
    type: "Expense",
    amount: "",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState<{
    amount?: string;
    category?: string;
  }>({});

  // 🔑 This fills the form when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        type: "Expense",
        amount: "",
        category: "",
        description: "",
      });
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { amount?: string; category?: string } = {};

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const inputClasses =
    "w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 transition";

  const errorInputClasses =
    "w-full rounded-xl border border-red-400 px-3.5 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900">
          Transaction Details
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          {initialData
            ? "Update the information below"
            : "Fill in the information below"}
        </p>
      </div>

      {/* Date */}
      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
        <label className="text-right text-sm font-medium text-slate-700">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* Type */}
      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
        <label className="text-right text-sm font-medium text-slate-700">
          Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      {/* Amount */}
      <div className="grid grid-cols-[120px_1fr] items-start gap-4">
        <label className="pt-2.5 text-right text-sm font-medium text-slate-700">
          Amount
        </label>
        <div>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={errors.amount ? errorInputClasses : inputClasses}
          />
          {errors.amount && (
            <p className="mt-1.5 text-xs text-red-500">{errors.amount}</p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="grid grid-cols-[120px_1fr] items-start gap-4">
        <label className="pt-2.5 text-right text-sm font-medium text-slate-700">
          Category
        </label>
        <div>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? errorInputClasses : inputClasses}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-[120px_1fr] items-start gap-4">
        <label className="pt-2.5 text-right text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          placeholder="Optional note..."
          className={inputClasses}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-[#007BFF] py-2.5 text-sm font-medium text-white hover:bg-[#0066d6]"
        >
          {initialData ? "Save Changes" : "Add Transaction"}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
