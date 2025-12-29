-- =====================================================
-- LISTINGS TABLE MIGRATION
-- =====================================================
-- Description: Creates the listings table for storing vehicle and property listings
-- Author: Auto Real Estate Ecommerce
-- Date: 2023-12-29
-- =====================================================

-- Create listings table
CREATE TABLE IF NOT EXISTS public.listings (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign key to auth.users (seller)
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Listing category
  category TEXT NOT NULL CHECK (category IN ('VEHICLE', 'PROPERTY')),

  -- Core listing information
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(15, 2) NOT NULL CHECK (price >= 0),
  location TEXT NOT NULL,
  image_url TEXT,

  -- Flexible metadata for category-specific fields
  -- For VEHICLE: {year, color, mileage, fuelType, bodyType}
  -- For PROPERTY: {year, color: "finish", mileage: "condition", fuelType: "N/A", bodyType: "propertyType"}
  specs JSONB DEFAULT '{}'::jsonb,

  -- Listing status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold', 'archived', 'pending')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Index for filtering by category
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.listings(category);

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);

-- Index for ordering by creation date (most recent first)
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON public.listings(created_at DESC);

-- Index for filtering by user (seller's listings)
CREATE INDEX IF NOT EXISTS idx_listings_user_id ON public.listings(user_id);

-- Composite index for common query pattern (category + status + created_at)
CREATE INDEX IF NOT EXISTS idx_listings_category_status_created
  ON public.listings(category, status, created_at DESC);

-- GIN index for JSONB specs field (enables fast queries on specs)
CREATE INDEX IF NOT EXISTS idx_listings_specs ON public.listings USING GIN(specs);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active listings (public read access)
CREATE POLICY "Anyone can view active listings"
  ON public.listings
  FOR SELECT
  USING (status = 'active');

-- Policy: Authenticated users can view their own listings (any status)
CREATE POLICY "Users can view their own listings"
  ON public.listings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Authenticated users can create listings
CREATE POLICY "Authenticated users can create listings"
  ON public.listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own listings
CREATE POLICY "Users can update their own listings"
  ON public.listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own listings
CREATE POLICY "Users can delete their own listings"
  ON public.listings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function before update
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.listings IS 'Stores vehicle and property listings posted by users';
COMMENT ON COLUMN public.listings.id IS 'Unique identifier for the listing';
COMMENT ON COLUMN public.listings.user_id IS 'ID of the user who created the listing (seller)';
COMMENT ON COLUMN public.listings.category IS 'Type of listing: VEHICLE or PROPERTY';
COMMENT ON COLUMN public.listings.title IS 'Listing title (e.g., "2025 NISSAN ALMERA VL")';
COMMENT ON COLUMN public.listings.description IS 'Detailed description of the listing';
COMMENT ON COLUMN public.listings.price IS 'Listing price in local currency';
COMMENT ON COLUMN public.listings.location IS 'Location of the listing (e.g., "Makati City, Metro Manila")';
COMMENT ON COLUMN public.listings.image_url IS 'URL to the main listing image';
COMMENT ON COLUMN public.listings.specs IS 'JSONB object containing category-specific specifications';
COMMENT ON COLUMN public.listings.status IS 'Current status of the listing: active, sold, archived, or pending';
COMMENT ON COLUMN public.listings.created_at IS 'Timestamp when the listing was created';
COMMENT ON COLUMN public.listings.updated_at IS 'Timestamp when the listing was last updated';
