import styles from './page.module.css';
import LoginPage from './(pages)/login/page';

export default function App() {
    return (
        <div className={styles.page}>
            <LoginPage />
        </div>
    )
}