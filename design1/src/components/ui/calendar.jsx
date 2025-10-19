"use client";

import *"react";
import { ChevronLeft, ChevronRight } from "lucide-react@0.487.0";
import { DayPicker } from "react-day-picker@8.10.1";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months,
        month,
        caption,
        caption_label,
        nav,
        nav_button: cn(
          buttonVariants({ variant),
          "size-7 bg-transparent p-0 opacity-50 hover,
        ),
        nav_button_previous,
        nav_button_next,
        table,
        head_row,
        head_cell,
        row,
        cell: cn(
          "relative p-0 text-center text-sm focus-within:has([aria-selected])]:has([aria-selected].day-range-end)],
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:has(>.day-range-start)]:has([aria-selected])]:has([aria-selected])]
            :has([aria-selected])],
        ),
        day: cn(
          buttonVariants({ variant),
          "size-8 p-0 font-normal aria-selected,
        ),
        day_range_start,
        day_range_end,
        day_selected,
        day_today,
        day_outside,
        day_disabled,
        day_range_middle,
        day_hidden,
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
