import { ReactNode, useState } from "react";
import { Plane, LogOut, Home, Settings, Compass } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { ChatInterface } from "@/components/ChatInterface";
import { supabase } from "@/integrations/supabase/client";

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * Layout for authenticated app pages.
 * Includes persistent app navigation, chat widget, and user controls.
 */
export const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* App Navigation Header */}
      <header className="border-b border-border/40 bg-background/98 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3.5 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/app/dashboard" className="flex items-center gap-2.5 min-w-fit hover:opacity-80 transition-opacity">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center shadow-md">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent block leading-none">
                Trippy AI
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">Travel Planner</span>
            </div>
          </Link>

          {/* App Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/app/dashboard" className="text-sm font-medium text-foreground/80 hover:text-travel-sky transition-colors flex items-center gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to="/app/planning" className="text-sm font-medium text-foreground/80 hover:text-travel-ocean transition-colors flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Plans
            </Link>
            <Link to="/app/destinations" className="text-sm font-medium text-foreground/80 hover:text-travel-coral transition-colors flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Destinations
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsChatOpen(true)}
              className="text-xs font-medium hover:bg-travel-sky/10 hover:text-travel-sky"
            >
              Chat with Trippy
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="text-xs font-medium hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Chat Widget */}
      <FloatingChatButton onClick={() => setIsChatOpen(true)} />
      {isChatOpen && <ChatInterface onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};
