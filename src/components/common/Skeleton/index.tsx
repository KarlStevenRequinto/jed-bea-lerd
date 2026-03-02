"use client";

interface SkeletonProps {
    className?: string;
}

const Skeleton = ({ className = "" }: SkeletonProps) => {
    return <div className={`skeleton-base ${className}`.trim()} aria-hidden="true" />;
};

export default Skeleton;
