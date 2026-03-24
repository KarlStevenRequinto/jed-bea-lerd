insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'listing-media',
    'listing-media',
    true,
    5242880,
    array[
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
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
          and policyname = 'listing_media_public_read'
    ) then
        create policy "listing_media_public_read"
        on storage.objects
        for select
        using (bucket_id = 'listing-media');
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'storage'
          and tablename = 'objects'
          and policyname = 'listing_media_authenticated_insert'
    ) then
        create policy "listing_media_authenticated_insert"
        on storage.objects
        for insert
        to authenticated
        with check (bucket_id = 'listing-media');
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'storage'
          and tablename = 'objects'
          and policyname = 'listing_media_authenticated_update'
    ) then
        create policy "listing_media_authenticated_update"
        on storage.objects
        for update
        to authenticated
        using (bucket_id = 'listing-media')
        with check (bucket_id = 'listing-media');
    end if;

    if not exists (
        select 1
        from pg_policies
        where schemaname = 'storage'
          and tablename = 'objects'
          and policyname = 'listing_media_authenticated_delete'
    ) then
        create policy "listing_media_authenticated_delete"
        on storage.objects
        for delete
        to authenticated
        using (bucket_id = 'listing-media');
    end if;
end $$;
