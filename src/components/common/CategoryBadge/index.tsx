interface CategoryBadgeProps {
    category: "vehicle" | "property";
    className?: string;
}

const CategoryBadge = ({ category, className = "" }: CategoryBadgeProps) => (
    <span
        className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded text-white ${
            category === "vehicle"
                ? "bg-[var(--color-brand)]"
                : "bg-[var(--color-success)]"
        } ${className}`}
    >
        {category === "vehicle" ? "VEHICLE" : "PROPERTY"}
    </span>
);

export default CategoryBadge;
