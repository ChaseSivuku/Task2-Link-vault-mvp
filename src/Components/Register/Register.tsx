import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Register.module.css";

type Props = {
  onNavigateToLogin: () => void;
  onNavigateToLanding: () => void;
};

export const Register = ({ onNavigateToLogin, onNavigateToLanding }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const success = register(username, email, password);
    if (!success) {
      setError("Email or username already exists");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <img src="/logo/logo.png" alt="Logo" className={styles.logo} />
        </div>
        <h2 className={styles.title}>Sign Up</h2>
        <p className={styles.subtitle}>Create an account to start organizing your links.</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Already have an account?{" "}
            <button className={styles.linkButton} onClick={onNavigateToLogin}>
              Sign In
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


