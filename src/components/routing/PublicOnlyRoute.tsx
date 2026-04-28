import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

/**
 * Prevents authenticated users from accessing public-only pages (like /auth).
 * Redirects logged-in users to /app/dashboard.
 */
export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // User is logged in, redirect to app
          navigate("/app/dashboard", { replace: true });
        } else {
          // User is not logged in, allow access to public page
          setCanAccess(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setCanAccess(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/app/dashboard", { replace: true });
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

  return canAccess ? <>{children}</> : null;
};
