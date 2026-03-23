-- Social feed posts and media
-- Creates persistent feed_posts/feed_post_media tables with RLS for public reads
-- and owner-scoped writes.

create extension if not exists pgcrypto;

create table if not exists public.feed_posts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    content text null,
    post_type text not null default 'social' check (post_type in ('social')),
    status text not null default 'published' check (status in ('published', 'archived')),
    likes_count integer not null default 0,
    comments_count integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint feed_posts_content_or_media_required check (content is null or length(trim(content)) > 0)
);

create table if not exists public.feed_post_media (
    id uuid primary key default gen_random_uuid(),
    post_id uuid not null references public.feed_posts (id) on delete cascade,
    media_type text not null check (media_type in ('image', 'video')),
    storage_path text not null,
    public_url text not null,
    sort_order integer not null default 0,
    created_at timestamptz not null default now()
);

create index if not exists idx_feed_posts_created_at on public.feed_posts (created_at desc);
create index if not exists idx_feed_posts_user_id on public.feed_posts (user_id);
create index if not exists idx_feed_post_media_post_id on public.feed_post_media (post_id, sort_order);

alter table public.feed_posts enable row level security;
alter table public.feed_post_media enable row level security;

do $$
begin
    if not exists (
        select 1
        from pg_policies
        where schemaname = 'public'
          and tablename = 'feed_posts'
          and policyname = 'feed_posts_public_read_published'
    ) then
        create policy "feed_posts_public_read_published"
        on public.feed_posts
        for select
        using (status = 'published');
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'public'
          and tablename = 'feed_posts'
          and policyname = 'feed_posts_authenticated_insert_own'
    ) then
        create policy "feed_posts_authenticated_insert_own"
        on public.feed_posts
        for insert
        to authenticated
        with check (auth.uid() = user_id);
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'public'
          and tablename = 'feed_posts'
          and policyname = 'feed_posts_authenticated_update_own'
    ) then
        create policy "feed_posts_authenticated_update_own"
        on public.feed_posts
        for update
        to authenticated
        using (auth.uid() = user_id)
        with check (auth.uid() = user_id);
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'public'
          and tablename = 'feed_posts'
          and policyname = 'feed_posts_authenticated_delete_own'
    ) then
        create policy "feed_posts_authenticated_delete_own"
        on public.feed_posts
        for delete
        to authenticated
        using (auth.uid() = user_id);
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'public'
          and tablename = 'feed_post_media'
          and policyname = 'feed_post_media_public_read'
    ) then
        create policy "feed_post_media_public_read"
        on public.feed_post_media
        for select
        using (
            exists (
                select 1
                from public.feed_posts fp
                where fp.id = post_id
                  and fp.status = 'published'
            )
        );
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'public'
          and tablename = 'feed_post_media'
          and policyname = 'feed_post_media_authenticated_insert_own'
    ) then
        create policy "feed_post_media_authenticated_insert_own"
        on public.feed_post_media
        for insert
        to authenticated
        with check (
            exists (
                select 1
                from public.feed_posts fp
                where fp.id = post_id
                  and fp.user_id = auth.uid()
            )
        );
    end if;
end $$;
