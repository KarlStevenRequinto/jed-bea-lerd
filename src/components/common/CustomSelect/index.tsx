"use client";

import React, { useState, useRef, useEffect } from "react";
import { ExpandArrowIconSvg } from "@/components/svg-icons";

interface CustomSelectProps {
    id?: string;
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ id, name, value, onChange, options, placeholder = "Select option", className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        const syntheticEvent = {
            target: { name: name || "", value: optionValue },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative">
            {/* Hidden select for form compatibility */}
            <select id={id} name={name} value={value} onChange={onChange} className="hidden" aria-hidden="true">
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {/* Custom select button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full rounded-md border border-border bg-primary-foreground px-3 py-2 pr-10 text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    !value ? "text-muted-foreground" : "text-foreground text-normal"
                } ${className}`}
            >
                {selectedOption ? selectedOption.label : placeholder}
            </button>

            {/* Dropdown arrow */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ExpandArrowIconSvg />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-primary-foreground border border-border rounded-md shadow-lg max-h-60 overflow-y-auto overflow-x-hidden px-1 py-1">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            className={`w-full text-left px-3 py-2 my-0.5 rounded text-sm transition-colors ${
                                value === option.value
                                    ? "bg-[var(--color-gray-300)] text-foreground"
                                    : "hover:bg-[var(--color-gray-300)] text-foreground"
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
