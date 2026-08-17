import React from "react";

interface FilterBarProps {
  typeFilter: "All" | "Income" | "Expense";
  categoryFilter: string;
  categories: string[];
  onTypeChange: (type: "All" | "Income" | "Expense") => void;
  onCategoryChange: (category: string) => void;
  onClear: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  typeFilter,
  categoryFilter,
  categories,
  onTypeChange,
  onCategoryChange,
  onClear,
}) => {
  const hasActiveFilters = typeFilter !== "All" || categoryFilter !== "";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600">Type:</label>
          <select
            value={typeFilter}
            onChange={(e) =>
              onTypeChange(e.target.value as "All" | "Income" | "Expense")
            }
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20"
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600">
            Category:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="text-sm font-medium text-[#007BFF] hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
