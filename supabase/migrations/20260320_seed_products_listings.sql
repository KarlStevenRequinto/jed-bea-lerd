-- Seed listings from products page mock data
-- Uses the first available auth.users entry as the listing owner.
-- Register at least one user before applying this migration.

DO $$
DECLARE
    seed_user_id uuid;
BEGIN
    SELECT id INTO seed_user_id FROM auth.users LIMIT 1;

    IF seed_user_id IS NULL THEN
        RAISE NOTICE 'No users found in auth.users — skipping seed. Register a user first, then re-run.';
        RETURN;
    END IF;

    -- ── Vehicles ────────────────────────────────────────────────────────────

    INSERT INTO public.listings (user_id, category, title, description, price, location, image_url, specs, status, created_at)
    VALUES
        (seed_user_id, 'VEHICLE', '2025 NISSAN ALMERA VL',
         'Brand new Nissan Almera VL with complete features and manufacturer warranty.',
         1195000, 'Bacolod City, Negros Occidental',
         'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&h=400&fit=crop&auto=format',
         '{"year":"2025","color":"Silver","mileage":"0 km","fuelType":"Gasoline","bodyType":"Sedan","brand":"Nissan"}'::jsonb,
         'active', '2026-03-19T10:00:00Z'),

        (seed_user_id, 'VEHICLE', '2019 TOYOTA FORTUNER',
         'Well-maintained Toyota Fortuner 4x2 G with complete service records.',
         1350000, 'Mandaue City, Cebu',
         'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=640&h=400&fit=crop&auto=format',
         '{"year":"2019","color":"White","mileage":"45,000 km","fuelType":"Gasoline","bodyType":"SUV","brand":"Toyota"}'::jsonb,
         'active', '2026-03-17T09:30:00Z'),

        (seed_user_id, 'VEHICLE', 'TOYOTA VIOS',
         'Sporty Toyota Vios XLE in excellent condition, all-original and well-kept.',
         859000, 'Talisay City, Negros Occidental',
         'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=640&h=400&fit=crop&auto=format',
         '{"year":"2022","color":"Red","mileage":"22,000 km","fuelType":"Gasoline","bodyType":"Sedan","brand":"Toyota"}'::jsonb,
         'active', '2026-03-15T14:00:00Z'),

        (seed_user_id, 'VEHICLE', 'HONDA CIVIC',
         'Honda Civic RS Turbo with sporty exterior and premium leather interior.',
         973000, 'Bacolod City, Negros Occidental',
         'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=640&h=400&fit=crop&auto=format',
         '{"year":"2021","color":"Lunar Silver","mileage":"35,000 km","fuelType":"Gasoline","bodyType":"Sedan","brand":"Honda"}'::jsonb,
         'active', '2026-03-14T11:00:00Z'),

        (seed_user_id, 'VEHICLE', 'MITSUBISHI MIRAGE G4',
         'Almost new Mitsubishi Mirage G4 GLS with CVT and all standard features.',
         793000, 'Tagbilaran City, Bohol',
         'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=640&h=400&fit=crop&auto=format',
         '{"year":"2023","color":"White","mileage":"8,000 km","fuelType":"Gasoline","bodyType":"Sedan","brand":"Mitsubishi"}'::jsonb,
         'active', '2026-03-12T08:45:00Z'),

        (seed_user_id, 'VEHICLE', 'TOYOTA VELOZ',
         'Toyota Veloz Q variant with all features included. Pristine condition.',
         1205000, 'Bacolod City, Negros Occidental',
         'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=640&h=400&fit=crop&auto=format',
         '{"year":"2023","color":"White","mileage":"12,000 km","fuelType":"Gasoline","bodyType":"SUV","brand":"Toyota"}'::jsonb,
         'active', '2026-03-10T16:20:00Z'),

        (seed_user_id, 'VEHICLE', '2021 SUZUKI JIMNY',
         'Iconic Suzuki Jimny GLX in rare Kinetic Yellow. Perfect for off-road adventures.',
         1331000, 'Iloilo City, Iloilo',
         'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=640&h=400&fit=crop&auto=format',
         '{"year":"2021","color":"Kinetic Yellow","mileage":"30,000 km","fuelType":"Gasoline","bodyType":"SUV","brand":"Suzuki"}'::jsonb,
         'active', '2026-03-08T13:10:00Z'),

        (seed_user_id, 'VEHICLE', 'FORD TERRITORY',
         'Ford Territory Titanium+ with SYNC 3 technology and panoramic sunroof.',
         1625000, 'Bacolod City, Negros Occidental',
         'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=640&h=400&fit=crop&auto=format',
         '{"year":"2022","color":"Blue","mileage":"18,000 km","fuelType":"Gasoline","bodyType":"SUV","brand":"Ford"}'::jsonb,
         'active', '2026-03-05T09:00:00Z'),

        (seed_user_id, 'VEHICLE', '2025 NISSAN ALMERA VL',
         'Brand new 2025 Nissan Almera VL in exclusive Bronze. Top-of-the-line specs.',
         1581000, 'Consolacion City, Cebu',
         'https://images.unsplash.com/photo-1462045504115-6c1d931f07d1?w=640&h=400&fit=crop&auto=format',
         '{"year":"2025","color":"Bronze","mileage":"0 km","fuelType":"Gasoline","bodyType":"Sedan","brand":"Nissan"}'::jsonb,
         'active', '2026-03-01T07:30:00Z'),

        (seed_user_id, 'VEHICLE', '2023 TOYOTA HILUX',
         'Toyota Hilux V 4x4 in excellent condition. Barely driven, full casa records.',
         2450000, 'Cebu City, Cebu',
         'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=640&h=400&fit=crop&auto=format',
         '{"year":"2023","color":"Black","mileage":"5,000 km","fuelType":"Diesel","bodyType":"Pickup Truck","brand":"Toyota"}'::jsonb,
         'active', '2026-02-25T10:15:00Z'),

        (seed_user_id, 'VEHICLE', '2022 TOYOTA RAV4',
         'Toyota RAV4 Hybrid with fuel-efficient engine. Well maintained, complete records.',
         1850000, 'Davao City, Davao del Sur',
         'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=640&h=400&fit=crop&auto=format',
         '{"year":"2022","color":"Pearl White","mileage":"28,000 km","fuelType":"Hybrid (Gas + Electric)","bodyType":"SUV","brand":"Toyota"}'::jsonb,
         'active', '2026-02-20T12:00:00Z'),

        (seed_user_id, 'VEHICLE', '2023 BYD ATTO 3',
         'BYD Atto 3 fully electric SUV with up to 480km range. Fast charging capable.',
         3200000, 'Quezon City, Metro Manila',
         'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=640&h=400&fit=crop&auto=format',
         '{"year":"2023","color":"Surf Blue","mileage":"10,000 km","fuelType":"Fully Electric (EV)","bodyType":"SUV","brand":"BYD"}'::jsonb,
         'active', '2026-02-15T15:45:00Z');

    -- ── Properties ───────────────────────────────────────────────────────────

    INSERT INTO public.listings (user_id, category, title, description, price, location, image_url, specs, status, created_at)
    VALUES
        (seed_user_id, 'PROPERTY', 'BELMONT ESTATE',
         'Grand estate property in the prestigious Ayala North Point community. 600 sqm lot, 4 bedrooms.',
         145000000, 'Ayala North Point, Talisay City, NOC',
         'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-03-18T08:00:00Z'),

        (seed_user_id, 'PROPERTY', 'THE PALMS RESIDENCES',
         'Modern tropical home with lush garden in a secure subdivision. 3 bedrooms, 2 baths.',
         7500000, 'Banawa Hills, Cebu City, CEB',
         'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-03-16T10:30:00Z'),

        (seed_user_id, 'PROPERTY', 'SOLSTICE MANOR',
         'Luxurious hilltop manor with panoramic city views. Infinity pool, 5 bedrooms, smart home system.',
         120000000, 'Lahug Heights, Cebu City, CEB',
         'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-03-13T09:00:00Z'),

        (seed_user_id, 'PROPERTY', 'MARIVISTA RESIDENCES',
         'Newly built 4-bedroom house with sea-view balcony in Marivista Subdivision.',
         10100000, 'Talisay City, Negros Occidental',
         'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-03-11T14:00:00Z'),

        (seed_user_id, 'PROPERTY', 'SUMMIT HEIGHTS',
         'Corner lot house in a tranquil summit community. 3 bedrooms, covered garage.',
         6100000, 'Liloan, Cebu',
         'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-03-09T11:30:00Z'),

        (seed_user_id, 'PROPERTY', 'HORIZON PARK ESTATE',
         'Well-maintained property in Horizon Park. Open-concept kitchen, 3 bedrooms.',
         8000000, 'Banilad, Cebu City, CEB',
         'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-03-07T08:00:00Z'),

        (seed_user_id, 'PROPERTY', 'MAHOGANY GROVE',
         'Sprawling family estate with mahogany garden. 5 bedrooms, entertainment room, swimming pool.',
         40000000, 'Canduman, Mandaue City, CEB',
         'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-03-04T10:00:00Z'),

        (seed_user_id, 'PROPERTY', 'MAGNOLIA HEIGHTS',
         'Contemporary 4-bedroom house in Capitolville. Corner lot, covered car park for 2.',
         14100000, 'Capitolville, Bacolod City, NOC',
         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-02-28T09:00:00Z'),

        (seed_user_id, 'PROPERTY', 'RAMIREZ RESIDENCES',
         '3-bedroom family home in a quiet street. Recently renovated, ready for occupancy.',
         8900000, 'Sta. Clara, Bacolod City, NOC',
         'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-02-23T13:00:00Z'),

        (seed_user_id, 'PROPERTY', 'THE RESIDENCES AT BGC',
         'Fully furnished 2BR condo unit in the heart of BGC. Floor-to-ceiling windows, city views.',
         15000000, 'Bonifacio Global City, Taguig',
         'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Condominium","brand":"Condominium"}'::jsonb,
         'active', '2026-02-18T10:00:00Z'),

        (seed_user_id, 'PROPERTY', 'EASTWOOD LE GRAND',
         'High-rise condo unit with city skyline view. 1BR, fully fitted kitchen, resort amenities.',
         8500000, 'Eastwood City, Quezon City',
         'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Condominium","brand":"Condominium"}'::jsonb,
         'active', '2026-02-12T09:30:00Z'),

        (seed_user_id, 'PROPERTY', 'ONE SHANGRI-LA PLACE',
         'Premium 2BR unit in iconic One Shangri-La Place. Hotel-style amenities, 24/7 security.',
         25000000, 'Mandaluyong City, Metro Manila',
         'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Condominium","brand":"Condominium"}'::jsonb,
         'active', '2026-02-08T14:00:00Z'),

        (seed_user_id, 'PROPERTY', 'SM NORTH BUSINESS CENTER',
         '3-storey commercial building near SM North. Ground floor retail, upper floors office space.',
         35000000, 'Mandaue City, Cebu',
         'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Commercial Building","brand":"Commercial Building"}'::jsonb,
         'active', '2026-02-05T08:00:00Z'),

        (seed_user_id, 'PROPERTY', 'ROBINSONS TOWNHOMES',
         'Brand new end-unit townhouse. 3 floors, 3 bedrooms, 2 baths. Near expressway.',
         4800000, 'Gen. Trias, Cavite',
         'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Townhouse","brand":"Townhouse"}'::jsonb,
         'active', '2026-01-30T11:00:00Z'),

        (seed_user_id, 'PROPERTY', 'DMCI TOWNHOUSES',
         'DMCI inner unit townhouse with balcony. 2 storeys, 3 bedrooms, gated community.',
         5200000, 'Las Pinas City, Metro Manila',
         'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Townhouse","brand":"Townhouse"}'::jsonb,
         'active', '2026-01-25T09:00:00Z'),

        (seed_user_id, 'PROPERTY', 'VILLA MORENA',
         'Spanish-inspired villa with 500 sqm lot in exclusive Guadalupe community.',
         22500000, 'Guadalupe, Cebu City, CEB',
         'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-01-20T08:30:00Z'),

        (seed_user_id, 'PROPERTY', 'CEDAR PARK ESTATES',
         'Sprawling mountain estate in Busay. 5 bedrooms, infinity pool, lush landscaping.',
         55000000, 'Busay, Cebu City, CEB',
         'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"House and Lot","brand":"House and Lot"}'::jsonb,
         'active', '2026-01-15T10:00:00Z'),

        (seed_user_id, 'PROPERTY', 'PACIFIC RESIDENCES',
         '2-bedroom apartment unit in a secured complex. Near malls and business centers.',
         3500000, 'Mandaue City, Cebu',
         'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Apartment","brand":"Apartment"}'::jsonb,
         'active', '2026-01-10T09:00:00Z'),

        (seed_user_id, 'PROPERTY', 'GREEN VALLEY COMMERCIAL',
         'Prime commercial building along main road. High foot traffic, 4 floors, ideal for retail.',
         45000000, 'Mandaue City, Cebu',
         'https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Commercial Building","brand":"Commercial Building"}'::jsonb,
         'active', '2026-01-05T11:00:00Z'),

        (seed_user_id, 'PROPERTY', 'STA. CRUZ VILLAGE LOT',
         'Clean titled residential lot in a quiet subdivision. Ready for construction.',
         2800000, 'Sta. Cruz, Davao City',
         'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Residential Lot","brand":"Residential Lot"}'::jsonb,
         'active', '2025-12-28T08:00:00Z'),

        (seed_user_id, 'PROPERTY', 'HILLSIDE TERRACE',
         '3-storey corner townhouse with mountain view terrace. 3 bedrooms, 2 parking slots.',
         6500000, 'Antipolo City, Rizal',
         'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=640&h=400&fit=crop&auto=format',
         '{"bodyType":"Townhouse","brand":"Townhouse"}'::jsonb,
         'active', '2025-12-20T10:30:00Z');

END $$;
