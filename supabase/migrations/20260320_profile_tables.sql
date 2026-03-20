-- ─── Tables ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_follows (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    follower_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    following_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_follows_no_self_follow CHECK (follower_id != following_id),
    UNIQUE(follower_id, following_id)
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    reviewee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reviewer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    reviewer_name text NOT NULL,
    reviewer_avatar_url text,
    rating integer NOT NULL,
    comment text,
    helpful_count integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (rating BETWEEN 1 AND 5)
);

CREATE TABLE IF NOT EXISTS public.recently_viewed (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
    viewed_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, listing_id)
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_following ON public.user_follows(following_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee ON public.reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_recently_viewed_user ON public.recently_viewed(user_id, viewed_at DESC);

-- ─── RLS ─────────────────────────────────────────────────────────────────────

ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed ENABLE ROW LEVEL SECURITY;

-- user_follows policies
CREATE POLICY "Users can view follows" ON public.user_follows FOR SELECT USING (true);
CREATE POLICY "Users can manage own follows" ON public.user_follows FOR ALL TO authenticated USING (auth.uid() = follower_id) WITH CHECK (auth.uid() = follower_id);

-- reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = reviewer_id OR reviewer_id IS NULL);

-- recently_viewed policies
CREATE POLICY "Users can manage own recently viewed" ON public.recently_viewed FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ─── Seed data ────────────────────────────────────────────────────────────────

DO $$
DECLARE
    seed_user_id uuid;
BEGIN
    SELECT id INTO seed_user_id FROM auth.users LIMIT 1;

    IF seed_user_id IS NULL THEN
        RAISE NOTICE 'No users found — skipping profile seed data.';
        RETURN;
    END IF;

    -- Seed reviews
    INSERT INTO public.reviews (reviewee_id, reviewer_name, reviewer_avatar_url, rating, comment, helpful_count, created_at)
    VALUES
        (seed_user_id, 'Adrian Ramos', null, 5,
         'Jamie was extremely helpful and professional throughout the entire buying process. Highly recommend!',
         12, '2026-03-06T10:00:00Z'),
        (seed_user_id, 'Nicole Aquino', null, 5,
         'Great communication and very responsive. Made the whole experience smooth and stress-free.',
         8, '2026-02-20T14:00:00Z'),
        (seed_user_id, 'Vincent Morales', null, 4,
         'Very knowledgeable about the market. Helped me find exactly what I was looking for.',
         5, '2026-01-20T09:00:00Z');

    -- Seed recently viewed (3 listings from the seeded listings)
    INSERT INTO public.recently_viewed (user_id, listing_id, viewed_at)
    SELECT seed_user_id, id, now() - (row_number() OVER (ORDER BY created_at DESC)) * interval '1 hour'
    FROM public.listings
    WHERE user_id = seed_user_id
    ORDER BY created_at DESC
    LIMIT 3
    ON CONFLICT (user_id, listing_id) DO NOTHING;

END $$;
