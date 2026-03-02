export interface Connection {
    id: string;
    name: string;
    role: string;
    avatar: string;
    isFollowing: boolean;
}

export const MOCK_FOLLOWING_CONNECTIONS: Connection[] = [
    { id: "1", name: "Miguel Santos", role: "Real Estate Agent", avatar: "", isFollowing: true },
    { id: "2", name: "Andrea Reyes", role: "Home Buyer", avatar: "", isFollowing: true },
    { id: "3", name: "Carlo Mendoza", role: "Property Investor", avatar: "", isFollowing: true },
    { id: "4", name: "Jasmine Cruz", role: "Car Buyer", avatar: "", isFollowing: true },
    { id: "5", name: "Joshua Navarro", role: "Car Sales Agent", avatar: "", isFollowing: true },
    { id: "6", name: "Patricia Lim", role: "Condo Broker", avatar: "", isFollowing: true },
    { id: "7", name: "Nathan Flores", role: "Auto Dealer", avatar: "", isFollowing: true },
    { id: "8", name: "Bea Gutierrez", role: "Land Investor", avatar: "", isFollowing: true },
    { id: "9", name: "Rico Evangelista", role: "Mortgage Consultant", avatar: "", isFollowing: true },
    { id: "10", name: "Alyssa Ramos", role: "Luxury Property Agent", avatar: "", isFollowing: true },
    { id: "11", name: "Marco Villanueva", role: "Fleet Sales Specialist", avatar: "", isFollowing: true },
    { id: "12", name: "Denise Ong", role: "Townhouse Buyer", avatar: "", isFollowing: true },
];

export const MOCK_FOLLOWER_CONNECTIONS: Connection[] = [
    { id: "101", name: "Ethan Dela Cruz", role: "First-time Car Buyer", avatar: "", isFollowing: false },
    { id: "102", name: "Katrina Sy", role: "Property Seeker", avatar: "", isFollowing: false },
    { id: "103", name: "Jerome Tan", role: "Auto Enthusiast", avatar: "", isFollowing: false },
    { id: "104", name: "Rhea Santos", role: "Condominium Investor", avatar: "", isFollowing: false },
    { id: "105", name: "Luis Mendoza", role: "Commercial Lot Buyer", avatar: "", isFollowing: false },
    { id: "106", name: "Mika Alvarez", role: "SUV Shopper", avatar: "", isFollowing: false },
    { id: "107", name: "Noel Garcia", role: "Real Estate Investor", avatar: "", isFollowing: false },
    { id: "108", name: "Camille Rivera", role: "Homeowner", avatar: "", isFollowing: false },
    { id: "109", name: "Harvey Co", role: "Vehicle Reseller", avatar: "", isFollowing: false },
    { id: "110", name: "Sofia Castillo", role: "Property Consultant", avatar: "", isFollowing: false },
];
