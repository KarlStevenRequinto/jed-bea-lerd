/**
 * Legacy Mock Listings
 *
 * DEPRECATED: This file contains mock data for development.
 * In production, listings should be fetched from Supabase via:
 * - src/lib/services/listings.ts (service layer)
 * - src/app/api/listings/route.ts (API routes)
 *
 * Use FormattedListing type from src/lib/types/listing.ts for new implementations.
 */

import { FormattedListing } from '@/lib/types/listing'

/**
 * @deprecated Use FormattedListing from @/lib/types/listing instead
 */
export interface Listing {
    id: number;
    category: string;
    price: string;
    title: string;
    location: string;
    year: string;
    color: string;
    mileage: string;
    fuelType: string;
    bodyType: string;
    description: string;
    image: string;
}

/**
 * Mock listings for development/testing
 * @deprecated Fetch real data from Supabase using getListings() from @/lib/services/listings
 */
export const MOCK_LISTINGS: Listing[] = [
    {
        id: 1,
        category: "VEHICLE",
        price: "₱1,195,000",
        title: "2025 NISSAN ALMERA VL",
        location: "Bacolod City, Negros Occidental",
        year: "2025",
        color: "Moon Pearl Gray",
        mileage: "5,000 km",
        fuelType: "GASOLINE",
        bodyType: "SEDAN",
        description:
            "Modern, reliable subcompact sedan offering great mileage, smart connectivity, and a comfortable ride for both city and highway travel.",
        image: "/images/sample-car.jpg",
    },
    {
        id: 2,
        category: "PROPERTY",
        price: "₱145,000,000",
        title: "THE BELMONT ESTATE",
        location: "Makati City, Metro Manila",
        year: "2024",
        color: "Modern White",
        mileage: "Brand New",
        fuelType: "N/A",
        bodyType: "LUXURY VILLA",
        description:
            "Stunning contemporary estate featuring premium finishes, spacious living areas, and breathtaking city views. Perfect for luxury living.",
        image: "/images/sample-car.jpg",
    },
    {
        id: 3,
        category: "PROPERTY",
        price: "₱145,000,000",
        title: "THE BELMONT ESTATE",
        location: "Makati City, Metro Manila",
        year: "2024",
        color: "Modern White",
        mileage: "Brand New",
        fuelType: "N/A",
        bodyType: "LUXURY VILLA",
        description:
            "Stunning contemporary estate featuring premium finishes, spacious living areas, and breathtaking city views. Perfect for luxury living.",
        image: "/images/sample-car.jpg",
    },
    {
        id: 4,
        category: "PROPERTY",
        price: "₱145,000,000",
        title: "THE BELMONT ESTATE",
        location: "Makati City, Metro Manila",
        year: "2024",
        color: "Modern White",
        mileage: "Brand New",
        fuelType: "N/A",
        bodyType: "LUXURY VILLA",
        description:
            "Stunning contemporary estate featuring premium finishes, spacious living areas, and breathtaking city views. Perfect for luxury living.",
        image: "/images/sample-car.jpg",
    },
    {
        id: 5,
        category: "VEHICLE",
        price: "₱1,195,000",
        title: "2025 NISSAN ALMERA VL",
        location: "Bacolod City, Negros Occidental",
        year: "2025",
        color: "Moon Pearl Gray",
        mileage: "5,000 km",
        fuelType: "GASOLINE",
        bodyType: "SEDAN",
        description:
            "Modern, reliable subcompact sedan offering great mileage, smart connectivity, and a comfortable ride for both city and highway travel.",
        image: "/images/sample-car.jpg",
    },
];
