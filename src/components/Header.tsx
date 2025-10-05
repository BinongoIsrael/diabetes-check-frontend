// Header.tsx
import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full border-b bg-card shadow-sm">
      <div className="container px-20 py-4">
        <div className="flex items-center justify-between">
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
        </div>
      </div>
    </header>
  );
}