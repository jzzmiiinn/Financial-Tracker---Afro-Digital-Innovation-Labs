import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  onAddTransaction: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onAddTransaction }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* Header stays full width */}
      <Header onAddTransaction={onAddTransaction} />

      {/* Content is limited in width and centered */}
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
