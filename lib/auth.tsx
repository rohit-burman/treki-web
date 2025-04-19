"use client";

import { useEffect, useState, ReactNode, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("treki-token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("treki-token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
      setIsClient(true);
      const token = localStorage.getItem("treki-token");
      
      if (!token && pathname !== "/login" && pathname !== "/register") {
        router.push("/login");
      }
    }, [pathname, router]);
    
    // Don't render anything during server-side rendering or when checking authentication
    if (!isClient) {
      return null;
    }
    
    return <Component {...props} />;
  };
} 