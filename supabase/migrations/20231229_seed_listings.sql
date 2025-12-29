-- =====================================================
-- SEED DATA FOR LISTINGS TABLE
-- =====================================================
-- Description: Inserts sample listings for development and testing
-- Author: Auto Real Estate Ecommerce
-- Date: 2023-12-29
-- =====================================================

-- Note: Replace 'YOUR_USER_ID_HERE' with an actual user ID from auth.users table
-- You can get a user ID by running: SELECT id FROM auth.users LIMIT 1;

-- For development, you can create a test user first:
-- Run this in Supabase SQL Editor to get a user ID:
-- SELECT id FROM auth.users LIMIT 1;

-- =====================================================
-- VEHICLE LISTINGS
-- =====================================================

INSERT INTO public.listings (user_id, category, title, description, price, location, image_url, specs, status)
VALUES
  -- Replace 'YOUR_USER_ID_HERE' with actual UUID from auth.users
  (
    (SELECT id FROM auth.users LIMIT 1),
    'VEHICLE',
    '2025 NISSAN ALMERA VL',
    'Modern, reliable subcompact sedan offering great mileage, smart connectivity, and a comfortable ride for both city and highway travel.',
    1195000,
    'Bacolod City, Negros Occidental',
    '/images/sample-car.jpg',
    '{"year": "2025", "color": "Moon Pearl Gray", "mileage": "5,000 km", "fuelType": "GASOLINE", "bodyType": "SEDAN"}'::jsonb,
    'active'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'VEHICLE',
    '2024 TOYOTA COROLLA ALTIS',
    'Reliable sedan with excellent fuel economy, spacious interior, and advanced safety features. Perfect for families and daily commuting.',
    1450000,
    'Manila City, Metro Manila',
    '/images/sample-car.jpg',
    '{"year": "2024", "color": "Silver Metallic", "mileage": "12,000 km", "fuelType": "GASOLINE", "bodyType": "SEDAN"}'::jsonb,
    'active'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'VEHICLE',
    '2023 HONDA CR-V',
    'Versatile SUV with ample cargo space, comfortable seating for five, and Honda''s renowned reliability. Ideal for adventures and family trips.',
    2150000,
    'Cebu City, Cebu',
    '/images/sample-car.jpg',
    '{"year": "2023", "color": "Crystal Black Pearl", "mileage": "18,500 km", "fuelType": "GASOLINE", "bodyType": "SUV"}'::jsonb,
    'active'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'VEHICLE',
    '2024 FORD RANGER RAPTOR',
    'Powerful pickup truck with off-road capabilities, rugged design, and advanced technology. Built for adventure and heavy-duty tasks.',
    2750000,
    'Davao City, Davao del Sur',
    '/images/sample-car.jpg',
    '{"year": "2024", "color": "Performance Blue", "mileage": "8,000 km", "fuelType": "DIESEL", "bodyType": "PICKUP"}'::jsonb,
    'active'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'VEHICLE',
    '2025 MAZDA CX-5',
    'Stylish and sporty SUV with premium interior, excellent handling, and advanced safety features. Perfect blend of luxury and performance.',
    1950000,
    'Quezon City, Metro Manila',
    '/images/sample-car.jpg',
    '{"year": "2025", "color": "Soul Red Crystal", "mileage": "3,200 km", "fuelType": "GASOLINE", "bodyType": "SUV"}'::jsonb,
    'active'
  );

-- =====================================================
-- PROPERTY LISTINGS
-- =====================================================

INSERT INTO public.listings (user_id, category, title, description, price, location, image_url, specs, status)
VALUES
  (
    (SELECT id FROM auth.users LIMIT 1),
    'PROPERTY',
    'THE BELMONT ESTATE',
    'Stunning contemporary estate featuring premium finishes, spacious living areas, and breathtaking city views. Perfect for luxury living.',
    145000000,
    'Makati City, Metro Manila',
    '/images/sample-car.jpg',
    '{"year": "2024", "color": "Modern White", "mileage": "Brand New", "fuelType": "N/A", "bodyType": "LUXURY VILLA"}'::jsonb,
    'active'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'PROPERTY',
    'AZURE BEACHFRONT VILLA',
    'Luxurious beachfront property with direct ocean access, infinity pool, and panoramic sea views. Your private paradise awaits.',
    198000000,
    'Boracay, Aklan',
    '/images/sample-car.jpg',
    '{"year": "2023", "color": "Tropical White", "mileage": "New Construction", "fuelType": "N/A", "bodyType": "BEACHFRONT VILLA"}'::jsonb,
    'active'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'PROPERTY',
    'SKYLINE PENTHOUSE',
    'Modern penthouse with floor-to-ceiling windows, rooftop terrace, and unobstructed city skyline views. Ultimate urban luxury.',
    89000000,
    'BGC, Taguig City',
    '/images/sample-car.jpg',
    '{"year": "2024", "color": "Contemporary Grey", "mileage": "Move-in Ready", "fuelType": "N/A", "bodyType": "PENTHOUSE"}'::jsonb,
    'active'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'PROPERTY',
    'GREEN VALLEY SUBDIVISION LOT',
    'Prime residential lot in exclusive subdivision with 24/7 security, clubhouse amenities, and scenic mountain views.',
    12000000,
    'Tagaytay City, Cavite',
    '/images/sample-car.jpg',
    '{"year": "2024", "color": "N/A", "mileage": "Vacant Lot", "fuelType": "N/A", "bodyType": "RESIDENTIAL LOT"}'::jsonb,
    'active'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'PROPERTY',
    'DOWNTOWN COMMERCIAL SPACE',
    'Strategic commercial property in the heart of business district. Ideal for retail, office, or mixed-use development.',
    75000000,
    'Ortigas Center, Pasig City',
    '/images/sample-car.jpg',
    '{"year": "2022", "color": "Corporate Grey", "mileage": "Ready for Occupancy", "fuelType": "N/A", "bodyType": "COMMERCIAL BUILDING"}'::jsonb,
    'active'
  ),
  (
    (SELECT id FROM auth.users LIMIT 1),
    'PROPERTY',
    'HERITAGE COLONIAL HOUSE',
    'Restored colonial-era house with original architectural details, modern amenities, and lush garden. A piece of history.',
    32000000,
    'Vigan City, Ilocos Sur',
    '/images/sample-car.jpg',
    '{"year": "1920", "color": "Heritage Beige", "mileage": "Restored", "fuelType": "N/A", "bodyType": "HERITAGE HOUSE"}'::jsonb,
    'active'
  );

-- =====================================================
-- VERIFY INSERTION
-- =====================================================

-- Check total count of inserted listings
-- SELECT COUNT(*) as total_listings FROM public.listings;

-- Check listings by category
-- SELECT category, COUNT(*) as count FROM public.listings GROUP BY category;
