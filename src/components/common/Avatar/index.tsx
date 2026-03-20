import Image from "next/image";

interface AvatarProps {
    name: string;
    avatarUrl?: string | null;
    size?: number;
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

const Avatar = ({ name, avatarUrl, size = 40 }: AvatarProps) => (
    <div
        className="rounded-full overflow-hidden bg-[var(--color-gray-200)] flex-shrink-0 flex items-center justify-center"
        style={{ width: size, height: size }}
    >
        {avatarUrl ? (
            <Image
                src={avatarUrl}
                alt={name}
                width={size}
                height={size}
                className="object-cover w-full h-full"
            />
        ) : (
            <span
                className="font-medium text-[var(--color-gray-600)]"
                style={{ fontSize: Math.round(size * 0.35) }}
            >
                {getInitials(name)}
            </span>
        )}
    </div>
);

export default Avatar;
