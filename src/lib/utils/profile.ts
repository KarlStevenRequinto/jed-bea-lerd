export function normalizeProfileSlug(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function buildProfileSlug(firstName?: string | null, lastName?: string | null): string {
    const fullName = `${firstName ?? ''}${lastName ?? ''}`
    return normalizeProfileSlug(fullName || 'user')
}

export function buildProfileSlugFromName(name: string): string {
    return normalizeProfileSlug(name || 'user')
}
