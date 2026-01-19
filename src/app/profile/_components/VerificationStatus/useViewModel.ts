import { useState } from "react";

interface VerificationItem {
    id: string;
    label: string;
    isVerified: boolean;
}

const mockVerificationData = {
    isVerified: true,
    verificationItems: [
        { id: "email", label: "Email confirmed", isVerified: true },
        { id: "phone", label: "Phone verified", isVerified: true },
        { id: "id", label: "ID Documents checked", isVerified: true },
    ] as VerificationItem[],
};

export const useVerificationStatusViewModel = () => {
    const [verificationData] = useState(mockVerificationData);

    return {
        verificationData,
    };
};
