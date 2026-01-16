import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { LinkVault } from "./Components/LinkVault/LinkVault";
import "./App.css";

type View = "landing" | "login" | "register" | "app";

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<View>("landing");

  // If authenticated, show the app
  if (isAuthenticated) {
    return <LinkVault />;
  }

  // Show appropriate view based on currentView state
  switch (currentView) {
    case "login":
      return (
        <Login
          onNavigateToRegister={() => setCurrentView("register")}
          onNavigateToLanding={() => setCurrentView("landing")}
        />
      );
    case "register":
      return (
        <Register
          onNavigateToLogin={() => setCurrentView("login")}
          onNavigateToLanding={() => setCurrentView("landing")}
        />
      );
    case "landing":
    default:
      return (
        <LandingPage
          onNavigateToLogin={() => setCurrentView("login")}
          onNavigateToRegister={() => setCurrentView("register")}
        />
      );
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;