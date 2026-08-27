"use client";

import { useRouter } from "next/navigation";
import { routesName } from "@/constants/routesName";
import Card from "@/components/atoms/Card/Card";
import Button from "@/components/atoms/Button/Button";

const UnauthorizedPageView = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-[80vh] p-8">
            <Card maxWidth="max-w-[420px]" className="p-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Unauthorized Access</h2>
                <p className="text-[0.95rem] text-gray-600 mb-1.5 leading-relaxed">Session expired or you are not logged in.</p>
                <p className="text-[0.95rem] text-gray-600 mb-1.5 leading-relaxed">Please log in to access the contents.</p>
                <Button
                    onClick={() => router.push(routesName.login)}
                    variant="primary"
                    className="mt-6 w-full py-3 px-6 text-[0.95rem] font-semibold rounded-lg shadow-[0_4px_6px_rgba(66,133,244,0.2)]"
                >
                    Go to Login
                </Button>
            </Card>
        </div>
    );
}

export default UnauthorizedPageView;