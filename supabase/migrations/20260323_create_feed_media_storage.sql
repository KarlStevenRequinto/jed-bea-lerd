-- Storage bucket for feed post media
-- Uses a guarded DO block so reruns are safe without broad policy drops.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'feed-media',
    'feed-media',
    true,
    10485760,
    array[
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'video/mp4',
        'video/webm',
        'video/quicktime'
    ]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
    if not exists (
        select 1
        from pg_policies
        where schemaname = 'storage'
          and tablename = 'objects'
          and policyname = 'feed_media_public_read'
    ) then
        create policy "feed_media_public_read"
        on storage.objects
        for select
        using (bucket_id = 'feed-media');
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'storage'
          and tablename = 'objects'
          and policyname = 'feed_media_authenticated_insert'
    ) then
        create policy "feed_media_authenticated_insert"
        on storage.objects
        for insert
        to authenticated
        with check (bucket_id = 'feed-media');
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'storage'
          and tablename = 'objects'
          and policyname = 'feed_media_authenticated_update'
    ) then
        create policy "feed_media_authenticated_update"
        on storage.objects
        for update
        to authenticated
        using (bucket_id = 'feed-media')
        with check (bucket_id = 'feed-media');
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'storage'
          and tablename = 'objects'
          and policyname = 'feed_media_authenticated_delete'
    ) then
        create policy "feed_media_authenticated_delete"
        on storage.objects
        for delete
        to authenticated
        using (bucket_id = 'feed-media');
    end if;
end $$;
