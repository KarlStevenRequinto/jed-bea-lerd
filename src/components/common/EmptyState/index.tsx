interface EmptyStateProps {
    message: string;
    className?: string;
}

const EmptyState = ({ message, className = "" }: EmptyStateProps) => (
    <p className={`text-sm text-[var(--color-gray-500)] text-center py-6 ${className}`}>
        {message}
    </p>
);

export default EmptyState;
