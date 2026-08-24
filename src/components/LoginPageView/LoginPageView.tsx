"use client";

import styles from './LoginPageView.module.css';
import { signIn } from "next-auth/react";
import { routesName } from "@/constants/routesName";
import { GoogleIcon } from "@/assets/icons/googleLogo";

const LoginPage = () => {
    const loginWithGoogleHandler = () => {
        signIn("google", { callbackUrl: routesName.home });
    };

    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.loginCard}>
                <div className={styles.headerSection}>
                    <h1 className={styles.title}>Welcome</h1>
                    <p className={styles.subtitle}>Please sign in with your Google account to continue.</p>
                </div>

                <button className={styles.loginButton} onClick={loginWithGoogleHandler}>
                    <GoogleIcon className={styles.googleIcon} />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;