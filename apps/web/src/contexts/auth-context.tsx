import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { loginUser, registerUser } from '../services/auth-service';
import api from '../lib/api';

interface User {
  _id: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User | null;
        if (parsedUser) {
          setUser(parsedUser);
        }
      }
    } catch {
      window.localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const authData = await loginUser(email, password);
    const token = authData.token || authData.accessToken;
    const refreshToken = authData.refreshToken || authData.refresh_token;
    const nextUser = authData.user || authData.profile || authData.data?.user || authData.data?.profile;
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('refreshToken', refreshToken);
    window.localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const register = async (name: string, email: string, password: string) => {
    const authData = await registerUser(name, email, password);
    const token = authData.token || authData.accessToken;
    const refreshToken = authData.refreshToken || authData.refresh_token;
    const nextUser = authData.user || authData.profile || authData.data?.user || authData.data?.profile;
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('refreshToken', refreshToken);
    window.localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const logout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      loading,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
