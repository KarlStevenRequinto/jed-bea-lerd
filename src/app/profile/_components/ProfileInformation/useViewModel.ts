import { useState } from "react";

// Mock data - will be replaced with actual data from API later
const mockProfileInfo = {
    phone: "+639 12 345 6789",
    location: "Bacolod City, Negros Occidental",
    memberSince: "January 2026",
    aboutMe:
        "Passionate about real estate and helping people find their dream homes. Professional real estate broker with 10+ years of experience in the Negros Occidental and Visayas market.",
};

export const useProfileInformationViewModel = () => {
    const [profileInfo] = useState(mockProfileInfo);

    return {
        profileInfo,
    };
};
