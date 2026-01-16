import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Login.module.css";

type Props = {
  onNavigateToRegister: () => void;
  onNavigateToLanding: () => void;
};

export const Login = ({ onNavigateToRegister, onNavigateToLanding }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <img src="/logo/logo.png" alt="Logo" className={styles.logo} />
        </div>
        <h2 className={styles.title}>Sign In</h2>
        <p className={styles.subtitle}>Welcome back! Please sign in to your account.</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Don't have an account?{" "}
            <button className={styles.linkButton} onClick={onNavigateToRegister}>
              Sign Up
            </button>
          </p>
          <button className={styles.linkButton} onClick={onNavigateToLanding}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};


