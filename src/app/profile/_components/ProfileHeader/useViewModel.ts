import { useState } from "react";

// Mock data - will be replaced with actual data from API later
const mockUserData = {
    name: "John Doe",
    isVerified: true,
    role: "Real Estate Broker",
    email: "john.doe@email.com",
    profileImage: "/images/profile-placeholder.png",
    stats: {
        followers: 342,
        following: 156,
        listings: 12,
        reviews: 28,
    },
};

export const useProfileHeaderViewModel = () => {
    const [userData] = useState(mockUserData);

    const handleEditPhoto = () => {
        // TODO: Implement photo upload functionality
        console.log("Edit photo clicked");
    };

    return {
        userData,
        handleEditPhoto,
    };
};
