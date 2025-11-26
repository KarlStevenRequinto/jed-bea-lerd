/**
 * OTP Generation and Storage Utilities
 */

// Generate a random 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Calculate expiry time (in minutes)
export function getOTPExpiry(minutes: number = 5): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}
