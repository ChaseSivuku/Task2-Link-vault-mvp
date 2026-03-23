import { createContext } from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

