"use client";

import { useRouter } from "next/navigation";
import { routesName } from "@/constants/routesName";
import styles from "./UnauthorizedPageView.module.css";

const UnauthorizedPageView = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Unauthorized Access</h2>
                <p className={styles.message}>Session expired or you are not logged in.</p>
                <p className={styles.message}>Please log in to access the contents.</p>
                <button 
                    onClick={() => router.push(routesName.login)}
                    className={styles.button}
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}

export default UnauthorizedPageView;