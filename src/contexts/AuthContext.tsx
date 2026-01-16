import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = getUsersFromStorage();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        createdAt: foundUser.createdAt,
      };
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string): boolean => {
    const users = getUsersFromStorage();
    
    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      return false; // Email already registered
    }

    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      return false; // Username already taken
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto-login after registration
    const userData: User = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Helper function to get users from localStorage
function getUsersFromStorage(): Array<{
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}> {
  const usersJson = localStorage.getItem("users");
  if (usersJson) {
    try {
      return JSON.parse(usersJson);
    } catch {
      return [];
    }
  }
  return [];
}

