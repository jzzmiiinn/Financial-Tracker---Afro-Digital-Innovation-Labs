import React from "react";
import { Plus } from "lucide-react";
import logo from "../../assets/logo.png"; // adjust path if needed

interface HeaderProps {
  onAddTransaction: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTransaction }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Logo + Subtitle */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="AfroDigital"
            className="h-9 w-auto object-contain"
          />
          <p className="hidden text-xs text-slate-500 sm:block">
            Financial Tracking System
          </p>
        </div>

        {/* Center: Current Date */}
        <div className="hidden text-sm text-slate-500 md:block">{today}</div>

        {/* Right: Add button + Team name */}
        <div className="flex items-center gap-4">
          <button
            onClick={onAddTransaction}
            className="inline-flex items-center gap-2 rounded-xl bg-[#007BFF] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0066d6] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
          </button>

          <span className="hidden text-sm font-medium text-slate-600 sm:inline">
            AfroDigital Team
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
