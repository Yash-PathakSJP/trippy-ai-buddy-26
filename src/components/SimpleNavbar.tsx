import { Plane } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium relative group ${isActive ? "text-travel-sky" : "text-foreground/80 hover:text-travel-sky"}`;

const SimpleNavbar = () => (
  <header className="border-b border-border/40 bg-background/98 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto px-4 py-3.5 flex items-center justify-between gap-6">
      <Link to="/" className="flex items-center gap-2.5 min-w-fit hover:opacity-80 transition-opacity">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center shadow-md">
          <Plane className="h-5 w-5 text-white" />
        </div>
        <div className="hidden sm:block">
          <span className="text-xl font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent block leading-none">Trippy AI</span>
          <span className="text-[10px] text-muted-foreground font-medium">Your Travel Buddy</span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-5">
        <NavLink to="/features" className={linkClass}>
          <span>Features</span>
          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-travel-sky transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink to="/destinations" className={linkClass}>
          <span>Destinations</span>
          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-travel-sky transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink to="/packages" className={linkClass}>
          <span>Packages</span>
          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-travel-sky transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <div className="h-5 w-px bg-border/50"></div>
        <ThemeToggle />
      </nav>

      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default SimpleNavbar;
