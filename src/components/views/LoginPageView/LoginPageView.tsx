"use client";

import { signIn } from "next-auth/react";
import { routesName } from "@/constants/routesName";
import { GoogleIcon } from "@/assets/icons/googleLogo";
import Card from "@/components/atoms/Card/Card";
import Button from "@/components/atoms/Button/Button";

const LoginPage = () => {
    const loginWithGoogleHandler = () => {
        signIn("google", { callbackUrl: routesName.home });
    };

    return (
        <div className="w-screen min-h-screen flex justify-center items-center p-6 box-border bg-gradient-to-br from-gray-100 to-gray-200">
            <Card maxWidth="max-w-[400px]">
                <div className="mb-8">
                    <h1 className="text-[1.75rem] font-bold text-gray-900 mb-2">Welcome</h1>
                    <p className="text-[0.95rem] text-gray-500 leading-snug">Please sign in with your Google account to continue.</p>
                </div>

                <Button 
                    onClick={loginWithGoogleHandler}
                    variant="outline"
                    className="w-full py-3 px-5 text-[0.95rem] gap-3 rounded-lg"
                >
                    <GoogleIcon className="w-5 h-5 flex-shrink-0" />
                    <span>Sign in with Google</span>
                </Button>
            </Card>
        </div>
    );
};

export default LoginPage;