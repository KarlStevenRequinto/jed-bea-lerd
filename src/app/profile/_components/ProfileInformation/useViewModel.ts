'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileData } from '@/lib/types/profile'
import { formatMonthYear } from '@/lib/utils/formatters'

interface ProfileForm {
    firstName: string
    lastName: string
    phoneNumber: string
    city: string
    province: string
    country: string
    bio: string
}

const toForm = (profile: ProfileData | null): ProfileForm => ({
    firstName: profile?.firstName ?? '',
    lastName: profile?.lastName ?? '',
    phoneNumber: profile?.phoneNumber ?? '',
    city: profile?.city ?? '',
    province: profile?.province ?? '',
    country: profile?.country ?? '',
    bio: profile?.bio ?? '',
})

export const useProfileInformationViewModel = (profile: ProfileData | null) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [form, setForm] = useState<ProfileForm>(toForm(profile))

    const profileInfo = {
        phone: profile?.phoneNumber || '—',
        location: [profile?.city, profile?.province, profile?.country].filter(Boolean).join(', ') || '—',
        memberSince: profile?.createdAt ? formatMonthYear(profile.createdAt) : '—',
        aboutMe: profile?.bio || '—',
    }

    const handleEdit = () => {
        setForm(toForm(profile))
        setError(null)
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setError(null)
    }

    const handleChange = (field: keyof ProfileForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        setError(null)
        try {
            const response = await fetch('/api/profile/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await response.json()
            if (!response.ok) {
                setError(data.error || 'Failed to save profile')
                return
            }
            setIsEditing(false)
            router.refresh()
        } catch {
            setError('An unexpected error occurred')
        } finally {
            setIsSaving(false)
        }
    }

    return {
        profileInfo,
        isEditing,
        isSaving,
        error,
        form,
        handleEdit,
        handleCancel,
        handleChange,
        handleSave,
    }
}
