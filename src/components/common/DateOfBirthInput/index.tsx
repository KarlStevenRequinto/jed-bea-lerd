"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { BirthDateIconSvg } from "@/components/svg-icons";

interface DateOfBirthInputProps {
    id: string;
    name: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const DATE_FORMAT_PLACEHOLDER = "MM / DD / YYYY";

const formatDobInput = (input: string): string => {
    const digits = input.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} / ${digits.slice(2, 4)} / ${digits.slice(4)}`;
};

const parseDobValue = (input: string): Date | undefined => {
    const digits = input.replace(/\D/g, "");
    if (digits.length !== 8) return undefined;

    const month = Number(digits.slice(0, 2));
    const day = Number(digits.slice(2, 4));
    const year = Number(digits.slice(4, 8));

    if (!month || !day || !year || month > 12 || day > 31 || year < 1900) {
        return undefined;
    }

    const parsedDate = new Date(year, month - 1, day);
    const isValidDate =
        parsedDate.getFullYear() === year &&
        parsedDate.getMonth() === month - 1 &&
        parsedDate.getDate() === day;

    if (!isValidDate) return undefined;
    return parsedDate;
};

const formatDateValue = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month} / ${day} / ${year}`;
};

const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({ id, name, label, placeholder, value, onChange }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const selectedDate = useMemo(() => parseDobValue(value), [value]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsCalendarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(formatDobInput(event.target.value));
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return;
        onChange(formatDateValue(date));
        setIsCalendarOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative">
            <label htmlFor={id} className="flex items-center gap-2 text-normal text-sm ml-1">
                <span>{label}</span>
            </label>

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type="text"
                    inputMode="numeric"
                    maxLength={14}
                    placeholder={placeholder || DATE_FORMAT_PLACEHOLDER}
                    value={value}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-border bg-primary-foreground px-3 py-2 pr-11 text-sm text-normal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />

                <button
                    type="button"
                    onClick={() => setIsCalendarOpen((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    aria-label="Open date picker"
                    aria-expanded={isCalendarOpen}
                >
                    <BirthDateIconSvg />
                </button>
            </div>

            {isCalendarOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] z-30 rounded-xl border border-border bg-white p-3 shadow-xl">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        showOutsideDays
                        disabled={{ after: new Date() }}
                    />
                </div>
            )}
        </div>
    );
};

export default DateOfBirthInput;
