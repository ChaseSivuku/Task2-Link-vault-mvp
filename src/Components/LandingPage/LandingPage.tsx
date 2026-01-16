import styles from "./LandingPage.module.css";

type Props = {
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
};

export const LandingPage = ({ onNavigateToLogin, onNavigateToRegister }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <img src="/logo/logo.png" alt="Logo" className={styles.logo} />
        </div>
        <h1 className={styles.title}>Link Vault</h1>
        <p className={styles.subtitle}>
          Organize and manage your favorite links with ease
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.primaryButton} onClick={onNavigateToLogin}>
            Sign In
          </button>
          <button className={styles.secondaryButton} onClick={onNavigateToRegister}>
            Sign Up
          </button>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>📚 Organize</h3>
            <p>Keep all your links in one place</p>
          </div>
          <div className={styles.feature}>
            <h3>🏷️ Tag</h3>
            <p>Use hashtags to categorize your links</p>
          </div>
          <div className={styles.feature}>
            <h3>🔍 Search</h3>
            <p>Find your links quickly and easily</p>
          </div>
        </div>
      </div>
    </div>
  );
};

