"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { createElement } from "react";
import type { UserProfile } from "@/types/user";
import { mockLogin, mockSignUp, mockLogout } from "@/api/auth";

const STORAGE_KEY = "classcat-auth";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
}

interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readAuthStorage(): AuthState {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as AuthState;
      if (parsed.user && parsed.token) return parsed;
    }
  } catch {
    // ignore corrupted storage
  }
  return { user: null, token: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(readAuthStorage);
  const isLoading = false;
  const initialRender = useRef(true);

  // Persist to localStorage on change (skip first render)
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (state.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  const login = useCallback(async (email: string, password: string) => {
    const { user, token } = await mockLogin(email, password);
    setState({ user, token });
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      const { user, token } = await mockSignUp(name, email, password);
      setState({ user, token });
    },
    []
  );

  const logout = useCallback(async () => {
    await mockLogout();
    setState({ user: null, token: null });
  }, []);

  const updateUser = useCallback((updates: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  }, []);

  return createElement(
    AuthContext.Provider,
    {
      value: {
        user: state.user,
        isAuthenticated: !!state.user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
      },
    },
    children
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
