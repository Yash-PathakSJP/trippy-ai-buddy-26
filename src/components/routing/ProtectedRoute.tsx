import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setIsAuthenticated(true);
        } else {
          navigate("/auth", { replace: true });
        }
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/auth", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    // Check initial auth state
    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        navigate("/auth", { replace: true });
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin">
            <div className="h-12 w-12 border-4 border-travel-sky border-t-transparent rounded-full"></div>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
