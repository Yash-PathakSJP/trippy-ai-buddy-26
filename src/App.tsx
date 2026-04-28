import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

// Route Guards
import { ProtectedRoute } from "@/components/routing/ProtectedRoute";
import { PublicOnlyRoute } from "@/components/routing/PublicOnlyRoute";

// Layouts
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { AppLayout } from "@/components/layouts/AppLayout";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Features from "./pages/Features.tsx";
import Destinations from "./pages/Destinations.tsx";
import Packages from "./pages/Packages.tsx";
import NotFound from "./pages/NotFound";

// App Pages
import Index from "./pages/Index";
import Booking from "./pages/Booking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ============= PUBLIC ROUTES (No Auth Required) ============= */}
            <Route element={<PublicLayout><LandingPage /></PublicLayout>} path="/" />
            
            <Route 
              path="/auth" 
              element={
                <PublicOnlyRoute>
                  <PublicLayout>
                    <Auth />
                  </PublicLayout>
                </PublicOnlyRoute>
              } 
            />

            {/* Marketing pages - publicly accessible */}
            <Route 
              path="/features" 
              element={
                <PublicLayout>
                  <Features />
                </PublicLayout>
              } 
            />
            <Route 
              path="/destinations" 
              element={
                <PublicLayout>
                  <Destinations />
                </PublicLayout>
              } 
            />
            <Route 
              path="/packages" 
              element={
                <PublicLayout>
                  <Packages />
                </PublicLayout>
              } 
            />

            {/* ============= PROTECTED ROUTES (Auth Required) ============= */}
            {/* App dashboard and main experience */}
            <Route 
              path="/app" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Index />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />

            {/* App sub-routes */}
            <Route 
              path="/app/dashboard" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Index />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/app/planning" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Index />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/app/destinations" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Destinations />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/app/booking" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Booking />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />

            {/* Fallback for 404s */}
            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
