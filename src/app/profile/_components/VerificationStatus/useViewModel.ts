import { ProfileData } from '@/lib/types/profile'

export const useVerificationStatusViewModel = (profile: ProfileData | null) => {
    const emailVerified = true // email is always verified after registration
    const phoneVerified = !!profile?.phoneNumber
    const idVerified = !!profile?.idType

    const isVerified = profile?.verified ?? false

    return {
        verificationData: {
            isVerified,
            verificationItems: [
                { id: 'email', label: 'Email confirmed', isVerified: emailVerified },
                { id: 'phone', label: 'Phone verified', isVerified: phoneVerified },
                { id: 'id', label: 'ID Documents checked', isVerified: idVerified },
            ],
        },
    }
}
