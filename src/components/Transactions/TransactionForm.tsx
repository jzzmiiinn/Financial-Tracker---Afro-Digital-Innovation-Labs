import React, { useState, useEffect, useMemo } from "react";
import { TRANSACTION_CATEGORIES } from "../../constants/categories"; 

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
  initialData?: TransactionFormData;
  isLoading?: boolean;
}

// Re-export for convenience
export { TRANSACTION_CATEGORIES };
export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

// Default form data
const getDefaultFormData = (): TransactionFormData => ({
  date: new Date().toISOString().split("T")[0],
  type: "Expense",
  amount: "",
  category: "",
  description: "",
});

// Reusable FormField component with accessibility
interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  required,
  children,
}) => {
  return (
    <div className="grid grid-cols-[120px_1fr] items-start gap-4">
      <label
        htmlFor={id}
        className="pt-2.5 text-right text-sm font-medium text-slate-700"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      <div>
        {children}
        {error && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="sr-only">Error:</span>
            <p className="text-xs text-red-500" role="alert">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] =
    useState<TransactionFormData>(getDefaultFormData());
  const [errors, setErrors] = useState<{
    amount?: string;
    category?: string;
  }>({});

  const isEditing = useMemo(() => !!initialData, [initialData]);
  const submitLabel = isEditing ? "Save Changes" : "Add Transaction";

  // Fill form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        description: initialData.description || "",
      });
    } else {
      setFormData(getDefaultFormData());
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

    // Clear error for this field if it exists
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (data: TransactionFormData) => {
    const newErrors: { amount?: string; category?: string } = {};

    const amount = Number(data.amount);
    if (!data.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a valid positive amount";
    }

    if (!data.category) {
      newErrors.category = "Please select a category";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first field with error for better UX
      const firstErrorField = document.querySelector(
        '[aria-invalid="true"]',
      ) as HTMLElement;
      if (firstErrorField) {
        firstErrorField.focus();
      }
      return;
    }

    onSubmit(formData);
  };

  const inputClasses =
    "w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 transition";

  const errorInputClasses =
    "w-full rounded-xl border border-red-400 px-3.5 py-2.5 text-sm text-slate-800 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
      noValidate
      aria-label={isEditing ? "Edit transaction form" : "Add transaction form"}
    >
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900">
          {isEditing ? "Edit Transaction" : "Transaction Details"}
        </h3>
        {isEditing && (
          <p className="text-sm text-slate-500 mt-1">
            Update the fields below and save your changes.
          </p>
        )}
      </div>

      {/* Date */}
      <FormField id="date" label="Date" required>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={inputClasses}
          aria-required="true"
          aria-describedby={errors.date ? "date-error" : undefined}
          aria-invalid={!!errors.date}
          required
        />
      </FormField>

      {/* Type */}
      <FormField id="type" label="Type" required>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={inputClasses}
          aria-required="true"
          required
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </FormField>

      {/* Amount */}
      <FormField id="amount" label="Amount" error={errors.amount} required>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
          min="0"
          step="0.01"
          className={errors.amount ? errorInputClasses : inputClasses}
          aria-required="true"
          aria-describedby={errors.amount ? "amount-error" : undefined}
          aria-invalid={!!errors.amount}
          required
        />
      </FormField>

      {/* Category */}
      <FormField
        id="category"
        label="Category"
        error={errors.category}
        required
      >
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={errors.category ? errorInputClasses : inputClasses}
          aria-required="true"
          aria-describedby={errors.category ? "category-error" : undefined}
          aria-invalid={!!errors.category}
          required
        >
          <option value="">Select category</option>
          {TRANSACTION_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </FormField>

      {/* Description */}
      <FormField id="description" label="Description">
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          placeholder="Optional note..."
          className={inputClasses}
          aria-describedby="description-hint"
        />
        <p id="description-hint" className="sr-only">
          Optional additional information about this transaction
        </p>
      </FormField>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="Cancel and close form"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-xl bg-[#007BFF] py-2.5 text-sm font-medium text-white hover:bg-[#0066d6] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          aria-label={isLoading ? "Saving transaction..." : submitLabel}
        >
          {isLoading ? (
            <>
              <span
                className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
              <span>Saving...</span>
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>

      {/* Form status messages for screen readers */}
      {Object.keys(errors).length > 0 && (
        <div className="sr-only" role="alert" aria-live="polite">
          Please fix the errors in the form: {Object.values(errors).join(". ")}
        </div>
      )}
    </form>
  );
};

export default TransactionForm;
