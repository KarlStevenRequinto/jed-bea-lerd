create extension if not exists pgcrypto;

create table if not exists public.listing_media (
    id uuid primary key default gen_random_uuid(),
    listing_id uuid not null references public.listings (id) on delete cascade,
    storage_path text not null,
    public_url text not null,
    sort_order integer not null default 0,
    is_featured boolean not null default false,
    created_at timestamptz not null default now()
);

create index if not exists idx_listing_media_listing_id on public.listing_media (listing_id, sort_order);

alter table public.listing_media enable row level security;

do $$
begin
    if not exists (
        select 1
        from pg_policies
        where schemaname = 'public'
          and tablename = 'listing_media'
          and policyname = 'listing_media_public_read_active_listing'
    ) then
        create policy "listing_media_public_read_active_listing"
        on public.listing_media
        for select
        using (
            exists (
                select 1
                from public.listings l
                where l.id = listing_id
                  and l.status = 'active'
            )
        );
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'public'
          and tablename = 'listing_media'
          and policyname = 'listing_media_authenticated_insert_own'
    ) then
        create policy "listing_media_authenticated_insert_own"
        on public.listing_media
        for insert
        to authenticated
        with check (
            exists (
                select 1
                from public.listings l
                where l.id = listing_id
                  and l.user_id = auth.uid()
            )
        );
    end if;
end $$;

alter table public.feed_posts
    add column if not exists listing_id uuid references public.listings (id) on delete cascade;

alter table public.feed_posts
    drop constraint if exists feed_posts_content_or_media_required;

alter table public.feed_posts
    drop constraint if exists feed_posts_post_type_check;

alter table public.feed_posts
    add constraint feed_posts_post_type_check
    check (post_type in ('social', 'vehicle', 'property'));

create index if not exists idx_feed_posts_listing_id on public.feed_posts (listing_id);
