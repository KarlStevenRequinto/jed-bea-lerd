"use client";

import { useState, useMemo, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListingTypeFilter = "all" | "vehicles" | "properties";

export interface ProductFilters {
    listingType: ListingTypeFilter;
    priceRange: [number, number];
    location: string;
    vehicleTypes: string[];
    fuelTypes: string[];
    propertyTypes: string[];
}

export interface MockListing {
    id: string;
    category: "VEHICLE" | "PROPERTY";
    priceValue: number;
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
    brand: string;
    createdAt: string; // ISO date string — used for newest-first sort
}

export interface PopularItem {
    name: string;
    count: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const ITEMS_PER_PAGE = 9;
export const PRICE_MIN = 0;
export const VEHICLE_PRICE_MAX = 5_000_000;
export const PROPERTY_PRICE_MAX = 150_000_000;

export const VEHICLE_TYPES = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Pickup Truck",
    "Van / MPV",
    "Motorcycle",
] as const;

export const FUEL_TYPES = [
    "Gasoline",
    "Diesel",
    "Fully Electric (EV)",
    "Hybrid (Gas + Electric)",
] as const;

export const PROPERTY_TYPES = [
    "House and Lot",
    "Townhouse",
    "Condominium",
    "Apartment",
    "Commercial Building",
    "Residential Lot",
] as const;

// ─── Helper ───────────────────────────────────────────────────────────────────

const priceMaxForType = (type: ListingTypeFilter): number =>
    type === "properties" ? PROPERTY_PRICE_MAX : VEHICLE_PRICE_MAX;

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_LISTINGS: MockListing[] = [
    // ── Vehicles ─────────────────────────────────────────────────────────────
    {
        id: "v1",
        category: "VEHICLE",
        priceValue: 1_195_000,
        price: "₱1,195,000",
        title: "2025 NISSAN ALMERA VL",
        location: "Bacolod City, Negros Occidental",
        year: "2025",
        color: "Silver",
        mileage: "0 km",
        fuelType: "Gasoline",
        bodyType: "Sedan",
        description: "Brand new Nissan Almera VL with complete features and manufacturer warranty.",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&h=400&fit=crop&auto=format",
        brand: "Nissan",
        createdAt: "2026-03-19T10:00:00Z",
    },
    {
        id: "v2",
        category: "VEHICLE",
        priceValue: 1_350_000,
        price: "₱1,350,000",
        title: "2019 TOYOTA FORTUNER",
        location: "Mandaue City, Cebu",
        year: "2019",
        color: "White",
        mileage: "45,000 km",
        fuelType: "Gasoline",
        bodyType: "SUV",
        description: "Well-maintained Toyota Fortuner 4x2 G with complete service records.",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=640&h=400&fit=crop&auto=format",
        brand: "Toyota",
        createdAt: "2026-03-17T09:30:00Z",
    },
    {
        id: "v3",
        category: "VEHICLE",
        priceValue: 859_000,
        price: "₱859,000",
        title: "TOYOTA VIOS",
        location: "Talisay City, Negros Occidental",
        year: "2022",
        color: "Red",
        mileage: "22,000 km",
        fuelType: "Gasoline",
        bodyType: "Sedan",
        description: "Sporty Toyota Vios XLE in excellent condition, all-original and well-kept.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=640&h=400&fit=crop&auto=format",
        brand: "Toyota",
        createdAt: "2026-03-15T14:00:00Z",
    },
    {
        id: "v4",
        category: "VEHICLE",
        priceValue: 973_000,
        price: "₱973,000",
        title: "HONDA CIVIC",
        location: "Bacolod City, Negros Occidental",
        year: "2021",
        color: "Lunar Silver",
        mileage: "35,000 km",
        fuelType: "Gasoline",
        bodyType: "Sedan",
        description: "Honda Civic RS Turbo with sporty exterior and premium leather interior.",
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=640&h=400&fit=crop&auto=format",
        brand: "Honda",
        createdAt: "2026-03-14T11:00:00Z",
    },
    {
        id: "v5",
        category: "VEHICLE",
        priceValue: 793_000,
        price: "₱793,000",
        title: "MITSUBISHI MIRAGE G4",
        location: "Tagbilaran City, Bohol",
        year: "2023",
        color: "White",
        mileage: "8,000 km",
        fuelType: "Gasoline",
        bodyType: "Sedan",
        description: "Almost new Mitsubishi Mirage G4 GLS with CVT and all standard features.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=640&h=400&fit=crop&auto=format",
        brand: "Mitsubishi",
        createdAt: "2026-03-12T08:45:00Z",
    },
    {
        id: "v6",
        category: "VEHICLE",
        priceValue: 1_205_000,
        price: "₱1,205,000",
        title: "TOYOTA VELOZ",
        location: "Bacolod City, Negros Occidental",
        year: "2023",
        color: "White",
        mileage: "12,000 km",
        fuelType: "Gasoline",
        bodyType: "SUV",
        description: "Toyota Veloz Q variant with all features included. Pristine condition.",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=640&h=400&fit=crop&auto=format",
        brand: "Toyota",
        createdAt: "2026-03-10T16:20:00Z",
    },
    {
        id: "v7",
        category: "VEHICLE",
        priceValue: 1_331_000,
        price: "₱1,331,000",
        title: "2021 SUZUKI JIMNY",
        location: "Iloilo City, Iloilo",
        year: "2021",
        color: "Kinetic Yellow",
        mileage: "30,000 km",
        fuelType: "Gasoline",
        bodyType: "SUV",
        description: "Iconic Suzuki Jimny GLX in rare Kinetic Yellow. Perfect for off-road adventures.",
        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=640&h=400&fit=crop&auto=format",
        brand: "Suzuki",
        createdAt: "2026-03-08T13:10:00Z",
    },
    {
        id: "v8",
        category: "VEHICLE",
        priceValue: 1_625_000,
        price: "₱1,625,000",
        title: "FORD TERRITORY",
        location: "Bacolod City, Negros Occidental",
        year: "2022",
        color: "Blue",
        mileage: "18,000 km",
        fuelType: "Gasoline",
        bodyType: "SUV",
        description: "Ford Territory Titanium+ with SYNC 3 technology and panoramic sunroof.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=640&h=400&fit=crop&auto=format",
        brand: "Ford",
        createdAt: "2026-03-05T09:00:00Z",
    },
    {
        id: "v9",
        category: "VEHICLE",
        priceValue: 1_581_000,
        price: "₱1,581,000",
        title: "2025 NISSAN ALMERA VL",
        location: "Consolacion City, Cebu",
        year: "2025",
        color: "Bronze",
        mileage: "0 km",
        fuelType: "Gasoline",
        bodyType: "Sedan",
        description: "Brand new 2025 Nissan Almera VL in exclusive Bronze. Top-of-the-line specs.",
        image: "https://images.unsplash.com/photo-1462045504115-6c1d931f07d1?w=640&h=400&fit=crop&auto=format",
        brand: "Nissan",
        createdAt: "2026-03-01T07:30:00Z",
    },
    {
        id: "v10",
        category: "VEHICLE",
        priceValue: 2_450_000,
        price: "₱2,450,000",
        title: "2023 TOYOTA HILUX",
        location: "Cebu City, Cebu",
        year: "2023",
        color: "Black",
        mileage: "5,000 km",
        fuelType: "Diesel",
        bodyType: "Pickup Truck",
        description: "Toyota Hilux V 4x4 in excellent condition. Barely driven, full casa records.",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=640&h=400&fit=crop&auto=format",
        brand: "Toyota",
        createdAt: "2026-02-25T10:15:00Z",
    },
    {
        id: "v11",
        category: "VEHICLE",
        priceValue: 1_850_000,
        price: "₱1,850,000",
        title: "2022 TOYOTA RAV4",
        location: "Davao City, Davao del Sur",
        year: "2022",
        color: "Pearl White",
        mileage: "28,000 km",
        fuelType: "Hybrid (Gas + Electric)",
        bodyType: "SUV",
        description: "Toyota RAV4 Hybrid with fuel-efficient engine. Well maintained, complete records.",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=640&h=400&fit=crop&auto=format",
        brand: "Toyota",
        createdAt: "2026-02-20T12:00:00Z",
    },
    {
        id: "v12",
        category: "VEHICLE",
        priceValue: 3_200_000,
        price: "₱3,200,000",
        title: "2023 BYD ATTO 3",
        location: "Quezon City, Metro Manila",
        year: "2023",
        color: "Surf Blue",
        mileage: "10,000 km",
        fuelType: "Fully Electric (EV)",
        bodyType: "SUV",
        description: "BYD Atto 3 fully electric SUV with up to 480km range. Fast charging capable.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=640&h=400&fit=crop&auto=format",
        brand: "BYD",
        createdAt: "2026-02-15T15:45:00Z",
    },

    // ── Properties ────────────────────────────────────────────────────────────
    {
        id: "p1",
        category: "PROPERTY",
        priceValue: 145_000_000,
        price: "₱145,000,000",
        title: "BELMONT ESTATE",
        location: "Ayala North Point, Talisay City, NOC",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Grand estate property in the prestigious Ayala North Point community. 600 sqm lot, 4 bedrooms.",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-03-18T08:00:00Z",
    },
    {
        id: "p2",
        category: "PROPERTY",
        priceValue: 7_500_000,
        price: "₱7,500,000",
        title: "THE PALMS RESIDENCES",
        location: "Banawa Hills, Cebu City, CEB",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Modern tropical home with lush garden in a secure subdivision. 3 bedrooms, 2 baths.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-03-16T10:30:00Z",
    },
    {
        id: "p3",
        category: "PROPERTY",
        priceValue: 120_000_000,
        price: "₱120,000,000",
        title: "SOLSTICE MANOR",
        createdAt: "2026-03-13T09:00:00Z",
        location: "Lahug Heights, Cebu City, CEB",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Luxurious hilltop manor with panoramic city views. Infinity pool, 5 bedrooms, smart home system.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
    },
    {
        id: "p4",
        category: "PROPERTY",
        priceValue: 10_100_000,
        price: "₱10,100,000",
        title: "MARIVISTA RESIDENCES",
        location: "Talisay City, Negros Occidental",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Newly built 4-bedroom house with sea-view balcony in Marivista Subdivision.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-03-11T14:00:00Z",
    },
    {
        id: "p5",
        category: "PROPERTY",
        priceValue: 6_100_000,
        price: "₱6,100,000",
        title: "SUMMIT HEIGHTS",
        location: "Liloan, Cebu",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Corner lot house in a tranquil summit community. 3 bedrooms, covered garage.",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-03-09T11:30:00Z",
    },
    {
        id: "p6",
        category: "PROPERTY",
        priceValue: 8_000_000,
        price: "₱8,000,000",
        title: "HORIZON PARK ESTATE",
        location: "Banilad, Cebu City, CEB",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Well-maintained property in Horizon Park. Open-concept kitchen, 3 bedrooms.",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-03-07T08:00:00Z",
    },
    {
        id: "p7",
        category: "PROPERTY",
        priceValue: 40_000_000,
        price: "₱40,000,000",
        title: "MAHOGANY GROVE",
        location: "Canduman, Mandaue City, CEB",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Sprawling family estate with mahogany garden. 5 bedrooms, entertainment room, swimming pool.",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-03-04T10:00:00Z",
    },
    {
        id: "p8",
        category: "PROPERTY",
        priceValue: 14_100_000,
        price: "₱14,100,000",
        title: "MAGNOLIA HEIGHTS",
        location: "Capitolville, Bacolod City, NOC",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Contemporary 4-bedroom house in Capitolville. Corner lot, covered car park for 2.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-02-28T09:00:00Z",
    },
    {
        id: "p9",
        category: "PROPERTY",
        priceValue: 8_900_000,
        price: "₱8,900,000",
        title: "RAMIREZ RESIDENCES",
        location: "Sta. Clara, Bacolod City, NOC",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "3-bedroom family home in a quiet street. Recently renovated, ready for occupancy.",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-02-23T13:00:00Z",
    },
    {
        id: "p10",
        category: "PROPERTY",
        priceValue: 15_000_000,
        price: "₱15,000,000",
        title: "THE RESIDENCES AT BGC",
        location: "Bonifacio Global City, Taguig",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Condominium",
        description: "Fully furnished 2BR condo unit in the heart of BGC. Floor-to-ceiling windows, city views.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=640&h=400&fit=crop&auto=format",
        brand: "Condominium",
        createdAt: "2026-02-18T10:00:00Z",
    },
    {
        id: "p11",
        category: "PROPERTY",
        priceValue: 8_500_000,
        price: "₱8,500,000",
        title: "EASTWOOD LE GRAND",
        location: "Eastwood City, Quezon City",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Condominium",
        description: "High-rise condo unit with city skyline view. 1BR, fully fitted kitchen, resort amenities.",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=640&h=400&fit=crop&auto=format",
        brand: "Condominium",
        createdAt: "2026-02-12T09:30:00Z",
    },
    {
        id: "p12",
        category: "PROPERTY",
        priceValue: 25_000_000,
        price: "₱25,000,000",
        title: "ONE SHANGRI-LA PLACE",
        location: "Mandaluyong City, Metro Manila",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Condominium",
        description: "Premium 2BR unit in iconic One Shangri-La Place. Hotel-style amenities, 24/7 security.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=640&h=400&fit=crop&auto=format",
        brand: "Condominium",
        createdAt: "2026-02-08T14:00:00Z",
    },
    {
        id: "p13",
        category: "PROPERTY",
        priceValue: 35_000_000,
        price: "₱35,000,000",
        title: "SM NORTH BUSINESS CENTER",
        location: "Mandaue City, Cebu",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Commercial Building",
        description: "3-storey commercial building near SM North. Ground floor retail, upper floors office space.",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=640&h=400&fit=crop&auto=format",
        brand: "Commercial Building",
        createdAt: "2026-02-05T08:00:00Z",
    },
    {
        id: "p14",
        category: "PROPERTY",
        priceValue: 4_800_000,
        price: "₱4,800,000",
        title: "ROBINSONS TOWNHOMES",
        location: "Gen. Trias, Cavite",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Townhouse",
        description: "Brand new end-unit townhouse. 3 floors, 3 bedrooms, 2 baths. Near expressway.",
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=640&h=400&fit=crop&auto=format",
        brand: "Townhouse",
        createdAt: "2026-01-30T11:00:00Z",
    },
    {
        id: "p15",
        category: "PROPERTY",
        priceValue: 5_200_000,
        price: "₱5,200,000",
        title: "DMCI TOWNHOUSES",
        location: "Las Piñas City, Metro Manila",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Townhouse",
        description: "DMCI inner unit townhouse with balcony. 2 storeys, 3 bedrooms, gated community.",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=640&h=400&fit=crop&auto=format",
        brand: "Townhouse",
        createdAt: "2026-01-25T09:00:00Z",
    },
    {
        id: "p16",
        category: "PROPERTY",
        priceValue: 22_500_000,
        price: "₱22,500,000",
        title: "VILLA MORENA",
        location: "Guadalupe, Cebu City, CEB",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Spanish-inspired villa with 500 sqm lot in exclusive Guadalupe community.",
        image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-01-20T08:30:00Z",
    },
    {
        id: "p17",
        category: "PROPERTY",
        priceValue: 55_000_000,
        price: "₱55,000,000",
        title: "CEDAR PARK ESTATES",
        location: "Busay, Cebu City, CEB",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "House and Lot",
        description: "Sprawling mountain estate in Busay. 5 bedrooms, infinity pool, lush landscaping.",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=640&h=400&fit=crop&auto=format",
        brand: "House and Lot",
        createdAt: "2026-01-15T10:00:00Z",
    },
    {
        id: "p18",
        category: "PROPERTY",
        priceValue: 3_500_000,
        price: "₱3,500,000",
        title: "PACIFIC RESIDENCES",
        location: "Mandaue City, Cebu",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Apartment",
        description: "2-bedroom apartment unit in a secured complex. Near malls and business centers.",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=640&h=400&fit=crop&auto=format",
        brand: "Apartment",
        createdAt: "2026-01-10T09:00:00Z",
    },
    {
        id: "p19",
        category: "PROPERTY",
        priceValue: 45_000_000,
        price: "₱45,000,000",
        title: "GREEN VALLEY COMMERCIAL",
        location: "Mandaue City, Cebu",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Commercial Building",
        description: "Prime commercial building along main road. High foot traffic, 4 floors, ideal for retail.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=400&fit=crop&auto=format",
        brand: "Commercial Building",
        createdAt: "2026-01-05T11:00:00Z",
    },
    {
        id: "p20",
        category: "PROPERTY",
        priceValue: 2_800_000,
        price: "₱2,800,000",
        title: "STA. CRUZ VILLAGE LOT",
        location: "Sta. Cruz, Davao City",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Residential Lot",
        description: "Clean titled residential lot in a quiet subdivision. Ready for construction.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=640&h=400&fit=crop&auto=format",
        brand: "Residential Lot",
        createdAt: "2025-12-28T08:00:00Z",
    },
    {
        id: "p21",
        category: "PROPERTY",
        priceValue: 6_500_000,
        price: "₱6,500,000",
        title: "HILLSIDE TERRACE",
        location: "Antipolo City, Rizal",
        year: "",
        color: "",
        mileage: "",
        fuelType: "",
        bodyType: "Townhouse",
        description: "3-storey corner townhouse with mountain view terrace. 3 bedrooms, 2 parking slots.",
        image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=640&h=400&fit=crop&auto=format",
        brand: "Townhouse",
        createdAt: "2025-12-20T10:30:00Z",
    },
];

// ─── ViewModel ────────────────────────────────────────────────────────────────

export const makeEmptyProductFilters = (type: ListingTypeFilter = "all"): ProductFilters => ({
    listingType: type,
    priceRange: [PRICE_MIN, priceMaxForType(type)],
    location: "",
    vehicleTypes: [],
    fuelTypes: [],
    propertyTypes: [],
});

export const useProductsMarketplaceViewModel = () => {
    const [filters, setFilters] = useState<ProductFilters>(makeEmptyProductFilters());
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // ── Derived: active price ceiling ─────────────────────────────────────────
    const activePriceMax = priceMaxForType(filters.listingType);

    // ── Derived: filtered listings ─────────────────────────────────────────────
    const filteredListings = useMemo(() => {
        return MOCK_LISTINGS.filter((listing) => {
            // Listing type
            if (filters.listingType === "vehicles" && listing.category !== "VEHICLE") return false;
            if (filters.listingType === "properties" && listing.category !== "PROPERTY") return false;

            // Price range
            if (
                listing.priceValue < filters.priceRange[0] ||
                listing.priceValue > filters.priceRange[1]
            )
                return false;

            // Location
            if (
                filters.location.trim() !== "" &&
                !listing.location.toLowerCase().includes(filters.location.trim().toLowerCase())
            )
                return false;

            // Vehicle-specific filters
            if (listing.category === "VEHICLE") {
                if (
                    filters.vehicleTypes.length > 0 &&
                    !filters.vehicleTypes.includes(listing.bodyType)
                )
                    return false;
                if (
                    filters.fuelTypes.length > 0 &&
                    !filters.fuelTypes.includes(listing.fuelType)
                )
                    return false;
            }

            // Property-specific filters
            if (listing.category === "PROPERTY") {
                if (
                    filters.propertyTypes.length > 0 &&
                    !filters.propertyTypes.includes(listing.bodyType)
                )
                    return false;
            }

            return true;
        }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [filters]);

    // ── Derived: pagination ────────────────────────────────────────────────────
    const totalPages = Math.max(1, Math.ceil(filteredListings.length / ITEMS_PER_PAGE));

    const paginatedListings = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredListings.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredListings, currentPage]);

    // ── Derived: popular items (context-aware) ─────────────────────────────────
    const popularItems = useMemo((): PopularItem[] => {
        if (filters.listingType === "properties") {
            const counts = MOCK_LISTINGS.filter(
                (l) => l.category === "PROPERTY"
            ).reduce<Record<string, number>>((acc, l) => {
                acc[l.bodyType] = (acc[l.bodyType] ?? 0) + 1;
                return acc;
            }, {});
            return Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([name, count]) => ({ name, count }));
        }

        const source =
            filters.listingType === "vehicles"
                ? MOCK_LISTINGS.filter((l) => l.category === "VEHICLE")
                : MOCK_LISTINGS.filter((l) => l.category === "VEHICLE");

        const counts = source.reduce<Record<string, number>>((acc, l) => {
            acc[l.brand] = (acc[l.brand] ?? 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }));
    }, [filters.listingType]);

    const popularTitle =
        filters.listingType === "properties" ? "Popular Property Types" : "Popular Brands";
    const popularSubtitle =
        filters.listingType === "properties"
            ? "Most searched property types this month"
            : "Based on units sold over the last month";

    // ── Filter handlers ────────────────────────────────────────────────────────
    const setListingType = useCallback((type: ListingTypeFilter) => {
        setFilters((prev) => ({
            ...prev,
            listingType: type,
            priceRange: [PRICE_MIN, priceMaxForType(type)],
            vehicleTypes: [],
            fuelTypes: [],
            propertyTypes: [],
        }));
        setCurrentPage(1);
    }, []);

    const setPriceRange = useCallback((range: [number, number]) => {
        setFilters((prev) => ({ ...prev, priceRange: range }));
        setCurrentPage(1);
    }, []);

    const setLocation = useCallback((location: string) => {
        setFilters((prev) => ({ ...prev, location }));
        setCurrentPage(1);
    }, []);

    const toggleVehicleType = useCallback((type: string) => {
        setFilters((prev) => ({
            ...prev,
            vehicleTypes: prev.vehicleTypes.includes(type)
                ? prev.vehicleTypes.filter((t) => t !== type)
                : [...prev.vehicleTypes, type],
        }));
        setCurrentPage(1);
    }, []);

    const toggleFuelType = useCallback((type: string) => {
        setFilters((prev) => ({
            ...prev,
            fuelTypes: prev.fuelTypes.includes(type)
                ? prev.fuelTypes.filter((t) => t !== type)
                : [...prev.fuelTypes, type],
        }));
        setCurrentPage(1);
    }, []);

    const togglePropertyType = useCallback((type: string) => {
        setFilters((prev) => ({
            ...prev,
            propertyTypes: prev.propertyTypes.includes(type)
                ? prev.propertyTypes.filter((t) => t !== type)
                : [...prev.propertyTypes, type],
        }));
        setCurrentPage(1);
    }, []);

    const clearAllFilters = useCallback(() => {
        setFilters((prev) => makeEmptyProductFilters(prev.listingType));
        setCurrentPage(1);
    }, []);

    // ── Pagination ─────────────────────────────────────────────────────────────
    const goToPage = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
        },
        [totalPages]
    );

    // ── Mobile filter drawer ───────────────────────────────────────────────────
    const toggleMobileFilter = useCallback(() => setIsMobileFilterOpen((p) => !p), []);
    const closeMobileFilter = useCallback(() => setIsMobileFilterOpen(false), []);

    const hasActiveFilters =
        filters.priceRange[0] !== PRICE_MIN ||
        filters.priceRange[1] !== activePriceMax ||
        filters.location.trim() !== "" ||
        filters.vehicleTypes.length > 0 ||
        filters.fuelTypes.length > 0 ||
        filters.propertyTypes.length > 0;

    return {
        filters,
        paginatedListings,
        totalCount: filteredListings.length,
        currentPage,
        totalPages,
        activePriceMax,
        popularItems,
        popularTitle,
        popularSubtitle,
        hasActiveFilters,
        isMobileFilterOpen,
        setListingType,
        setPriceRange,
        setLocation,
        toggleVehicleType,
        toggleFuelType,
        togglePropertyType,
        clearAllFilters,
        goToPage,
        toggleMobileFilter,
        closeMobileFilter,
    };
};
