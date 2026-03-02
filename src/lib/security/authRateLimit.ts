type RateLimitEntry = {
    attempts: number[];
    blockedUntil: number;
};

type RateLimitResult = {
    allowed: boolean;
    retryAfterSeconds: number;
};

type RateLimitOptions = {
    windowMs: number;
    maxAttempts: number;
    blockMs: number;
};

const store = new Map<string, RateLimitEntry>();

const now = () => Date.now();

const toSeconds = (ms: number) => Math.max(1, Math.ceil(ms / 1000));

const pruneAttempts = (attempts: number[], windowMs: number, currentTime: number) =>
    attempts.filter((timestamp) => currentTime - timestamp <= windowMs);

function checkLimit(key: string, options: RateLimitOptions): RateLimitResult {
    const currentTime = now();
    const existing = store.get(key);

    if (!existing) {
        store.set(key, { attempts: [currentTime], blockedUntil: 0 });
        return { allowed: true, retryAfterSeconds: 0 };
    }

    if (existing.blockedUntil > currentTime) {
        return {
            allowed: false,
            retryAfterSeconds: toSeconds(existing.blockedUntil - currentTime),
        };
    }

    existing.attempts = pruneAttempts(existing.attempts, options.windowMs, currentTime);

    if (existing.attempts.length >= options.maxAttempts) {
        existing.blockedUntil = currentTime + options.blockMs;
        store.set(key, existing);
        return {
            allowed: false,
            retryAfterSeconds: toSeconds(options.blockMs),
        };
    }

    existing.attempts.push(currentTime);
    store.set(key, existing);

    return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIpAddress(requestHeaders: Headers): string {
    const forwardedFor = requestHeaders.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0]?.trim() || "unknown";
    }

    const realIp = requestHeaders.get("x-real-ip");
    if (realIp) {
        return realIp;
    }

    return "unknown";
}

export function enforceAuthEmailRateLimit(params: {
    bucket: "send-verification" | "forgot-password";
    email: string;
    ipAddress: string;
}): RateLimitResult {
    const normalizedEmail = params.email.trim().toLowerCase();
    const emailKey = `${params.bucket}:email:${normalizedEmail}`;
    const ipKey = `${params.bucket}:ip:${params.ipAddress}`;

    const emailLimit = checkLimit(emailKey, {
        windowMs: 15 * 60 * 1000,
        maxAttempts: 3,
        blockMs: 10 * 60 * 1000,
    });

    if (!emailLimit.allowed) {
        return emailLimit;
    }

    const ipLimit = checkLimit(ipKey, {
        windowMs: 5 * 60 * 1000,
        maxAttempts: 10,
        blockMs: 10 * 60 * 1000,
    });

    if (!ipLimit.allowed) {
        return ipLimit;
    }

    return { allowed: true, retryAfterSeconds: 0 };
}
