import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

/**
 * Layout for public pages (landing, features, auth, etc.)
 * No authenticated-user navigation or app chrome.
 */
export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
};
