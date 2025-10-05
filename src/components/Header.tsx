// Header.tsx
import { Activity, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-card shadow-sm relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-primary">DiabetesCheck</h1>
              <p className="text-xs text-muted-foreground">Fuzzy Powered Risk Assessment</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <>  
          {/* Menu Panel */}
          <nav className="fixed top-[73px] right-4 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 md:hidden overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="py-2">
              <Link
                to="/"
                className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}