'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store'
import { setProfilePhoto } from '@/store/authSlice'
import { ProfileData, ProfileStats } from '@/lib/types/profile'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export const useProfileHeaderViewModel = (
    profile: ProfileData | null,
    stats: ProfileStats
) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const name = profile
        ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() || 'Unknown User'
        : 'Unknown User'

    const profileImage = previewUrl ?? profile?.profilePhotoUrl ?? '/images/profile-user.png'

    const handleEditPhoto = () => {
        setUploadError(null)
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!e.target) return
        // Reset input so the same file can be re-selected if needed
        e.target.value = ''

        if (!file) return

        // Client-side validation
        if (!ALLOWED_TYPES.includes(file.type)) {
            setUploadError('Only JPEG, PNG, and WebP images are allowed.')
            return
        }
        if (file.size > MAX_SIZE_BYTES) {
            setUploadError('Image must be under 5 MB.')
            return
        }

        // Show immediate local preview
        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)
        setIsUploading(true)
        setUploadError(null)

        try {
            const formData = new FormData()
            formData.append('photo', file)

            const response = await fetch('/api/profile/upload-photo', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                setUploadError(data.error || 'Upload failed. Please try again.')
                setPreviewUrl(null)
                return
            }

            // Replace blob preview with the real persisted URL
            setPreviewUrl(data.photoUrl)
            // Update navbar avatar via Redux
            dispatch(setProfilePhoto(data.photoUrl))
            // Re-run the server component so profile data is fresh
            router.refresh()
        } catch {
            setUploadError('An unexpected error occurred. Please try again.')
            setPreviewUrl(null)
        } finally {
            URL.revokeObjectURL(objectUrl)
            setIsUploading(false)
        }
    }

    return {
        name,
        email: profile?.email ?? '',
        isVerified: profile?.verified ?? false,
        profileImage,
        isUploading,
        uploadError,
        fileInputRef,
        handleEditPhoto,
        handleFileChange,
        stats: {
            followers: stats.followersCount,
            following: stats.followingCount,
            listings: stats.listingsCount,
            reviews: stats.reviewsCount,
        },
    }
}
