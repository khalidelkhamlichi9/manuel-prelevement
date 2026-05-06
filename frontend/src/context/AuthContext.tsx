"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiClient from "@/lib/apiClient";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: number;
  identifiant: string;
  nom: string;
  prenom: string;
  role: string;
  organisme: string | null;
  email: string | null;
  actif: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const userData = await apiClient.get("/api/v1/auth/me");
          setUser(userData);
        } catch (error) {
          console.error("Token invalide ou expiré", error);
          localStorage.removeItem("access_token");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [pathname]);

  const login = (token: string, userData: User) => {
    localStorage.setItem("access_token", token);
    setUser(userData);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
