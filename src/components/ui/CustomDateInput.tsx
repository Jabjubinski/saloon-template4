import { useState, useRef, useEffect, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { KeyboardEvent, MouseEvent } from "react";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// Shorter names for very small screens
const DAY_NAMES_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

export interface CustomDateInputProps {
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  onChange?: (event: { target: { name?: string; value: string } }) => void;
  value?: string | Date | null;
  label?: string;
  className?: string;
  minDate?: string | Date;
  maxDate?: string | Date;
  showClearButton?: boolean;
  dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
}

export default function CustomDateInput({
  placeholder = "Select Date",
  name,
  disabled = false,
  onChange,
  value,
  label,
  className,
  minDate,
  maxDate,
  showClearButton = true,
  dateFormat = "MM/DD/YYYY",
}: CustomDateInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [openUpward, setOpenUpward] = useState(false);

  const parseDate = (d: string | Date | null | undefined): Date | null => {
    if (!d) return null;
    const parsed = new Date(d);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    parseDate(value),
  );
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const hasValue = selectedDate !== null;

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedDate(parseDate(value));
  }, [value]);

  useEffect(() => {
    if (isOpen) {
      const initialFocus = selectedDate || new Date();
      setFocusedDate(initialFocus);
      setCurrentMonth(
        new Date(initialFocus.getFullYear(), initialFocus.getMonth(), 1),
      );
    }
  }, [isOpen, selectedDate]);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    switch (dateFormat) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      default:
        return `${month}/${day}/${year}`;
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
    setIsFocused(false);
    if (onChange) {
      const tzOffset = date.getTimezoneOffset() * 60000;
      const localISOTime = new Date(date.getTime() - tzOffset)
        .toISOString()
        .split("T")[0];
      onChange({ target: { name, value: localISOTime } });
    }
    inputRef.current?.focus();
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedDate(null);
    if (onChange) onChange({ target: { name, value: "" } });
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = Array(firstDay.getDay()).fill(null);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  }, [currentMonth]);

  const navigateMonth = (direction: number) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (!isOpen) {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        handleOpen();
      }
      return;
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.focus();
      return;
    }
    if (!focusedDate) return;
    const newFocusedDate = new Date(focusedDate);
    switch (e.key) {
      case "ArrowDown":
        newFocusedDate.setDate(focusedDate.getDate() + 7);
        break;
      case "ArrowUp":
        newFocusedDate.setDate(focusedDate.getDate() - 7);
        break;
      case "ArrowLeft":
        newFocusedDate.setDate(focusedDate.getDate() - 1);
        break;
      case "ArrowRight":
        newFocusedDate.setDate(focusedDate.getDate() + 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isDateDisabled(focusedDate)) handleDateSelect(focusedDate);
        return;
      default:
        return;
    }
    e.preventDefault();
    if (newFocusedDate.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(
        new Date(newFocusedDate.getFullYear(), newFocusedDate.getMonth(), 1),
      );
    }
    setFocusedDate(newFocusedDate);
  };

  const handleOpen = () => {
    if (disabled) return;
    if (!isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      // Space from bottom of input to bottom of viewport
      const spaceBelow = window.innerHeight - rect.bottom;
      // Also factor in the footer if present — avoid dropping into it
      const footer = document.querySelector("footer");
      let effectiveSpaceBelow = spaceBelow;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        effectiveSpaceBelow = Math.min(
          spaceBelow,
          footerRect.top - rect.bottom,
        );
      }
      // ~380px is approximate calendar height; flip if not enough room below
      setOpenUpward(effectiveSpaceBelow < 380);
    }
    setIsOpen(!isOpen);
    setIsFocused(true);
  };

  const baseInputStyles = cn(
    "w-full px-3 sm:px-4 h-12 sm:h-14 border rounded-md transition-all duration-300 ease-out flex items-center justify-between",
    "bg-white/5 backdrop-blur-sm cursor-pointer",
    "focus:outline-none focus:ring-pink/20 focus:border-pink",
    isOpen || isFocused
      ? "border-pink-500"
      : "border-white/20 hover:border-white/30",
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );

  const labelStyles = cn(
    "absolute left-3 sm:left-4 transition-all duration-200 pointer-events-none z-10",
    isOpen || isFocused || hasValue
      ? "-top-2 text-xs text-pink bg-dark px-1"
      : "top-3 sm:top-4 text-white/50 text-sm sm:text-base",
  );

  // Calendar flips upward when near the bottom of the viewport
  const calendarStyles = cn(
    "absolute z-[100] left-0 right-0 sm:right-auto",
    openUpward ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top",
    "bg-neutral-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10",
    "p-3 sm:p-4",
    "transition-all duration-300 ease-out transform",
    isOpen
      ? "opacity-100 scale-100 translate-y-0"
      : openUpward
        ? "opacity-0 scale-95 translate-y-2 pointer-events-none"
        : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
  );

  return (
    <div className="relative group w-full" ref={wrapperRef}>
      {label && (
        <label className={labelStyles} htmlFor={name}>
          {label}
        </label>
      )}

      <div
        ref={inputRef}
        className={baseInputStyles}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="calendar-dialog"
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-pink flex-shrink-0" />
          <span
            className={cn(
              "transition-colors duration-200 text-sm sm:text-base truncate",
              hasValue ? "text-white" : "text-white/50",
            )}
          >
            {hasValue ? formatDate(selectedDate) : label ? "" : placeholder}
          </span>
        </div>

        {showClearButton && hasValue && !disabled && (
          <button
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-pink flex-shrink-0 ml-2"
            type="button"
            aria-label="Clear selected date"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/50 hover:text-white" />
          </button>
        )}
      </div>

      <div
        id="calendar-dialog"
        className={calendarStyles}
        // On sm+ screens, enforce a minimum width; on mobile stretch to container
        style={{ minWidth: "min(100%, 300px)" }}
        role="dialog"
        aria-label="Calendar"
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-pink"
            type="button"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-pink" />
          </button>

          <h3
            className="text-base sm:text-lg font-semibold text-white font-display"
            aria-live="polite"
          >
            {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>

          <button
            onClick={() => navigateMonth(1)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-pink"
            type="button"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-pink" />
          </button>
        </div>

        {/* Day name headers */}
        <div
          className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2"
          aria-hidden="true"
        >
          {DAY_NAMES.map((day, i) => (
            <div key={day} className="text-center py-1 sm:py-2">
              {/* Show short single-letter on xs, full on sm+ */}
              <span className="text-xs font-medium text-white/40 sm:hidden">
                {DAY_NAMES_SHORT[i]}
              </span>
              <span className="hidden sm:inline text-xs font-medium text-white/40">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1" role="grid">
          {calendarDays.map((date, index) => {
            if (!date)
              return (
                <div
                  key={`empty-${index}`}
                  className="h-8 sm:h-10"
                  role="presentation"
                />
              );

            const isSelected = isSameDay(selectedDate, date);
            const isToday = isSameDay(new Date(), date);
            const isFocusedDay = isSameDay(focusedDate, date);
            const disabledDate = isDateDisabled(date);

            return (
              <button
                key={date.toISOString()}
                onClick={() => !disabledDate && handleDateSelect(date)}
                disabled={disabledDate}
                tabIndex={isFocusedDay ? 0 : -1}
                aria-label={`Select ${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                aria-selected={isSelected}
                className={cn(
                  // Responsive size: smaller on mobile, original on sm+
                  "h-8 w-full sm:h-10 sm:w-10 sm:mx-auto rounded-md sm:rounded-lg",
                  "text-xs sm:text-sm font-medium transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:border-pink focus:ring-offset-2 focus:ring-offset-neutral-900",
                  "flex items-center justify-center",
                  isSelected &&
                    "bg-pink text-neutral-950 shadow-lg shadow-pink-500/20 font-bold scale-105",
                  isToday &&
                    !isSelected &&
                    "bg-white/10 text-pink border border-pink-500/30",
                  disabledDate &&
                    "text-white/20 cursor-not-allowed hover:bg-transparent hover:text-white/20",
                  !isSelected &&
                    !isToday &&
                    !disabledDate &&
                    "text-white/70 hover:bg-white/10 hover:text-white",
                  isFocusedDay && !isSelected && "ring-2 ring-pink",
                )}
                type="button"
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {/* Today shortcut */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
          <button
            onClick={() => handleDateSelect(new Date())}
            className="w-full py-1.5 sm:py-2 px-4 bg-white/5 text-pink rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:border-pink"
            type="button"
          >
            Today
          </button>
        </div>
      </div>
    </div>
  );
}
