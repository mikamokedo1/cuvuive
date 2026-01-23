"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils/cn";
import { playButtonSound } from "@/libs/utils/playSound";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center select-none cursor-pointer font-bold font-display " +
    "font-extrabold text-white " +
    "transition-all duration-150 ease-out " +
    "hover:-translate-y-0.5 hover:brightness-105 " +
    "active:translate-y-1 active:brightness-95 " +
    "focus:outline-none disabled:opacity-50",
  {
    variants: {
      variant: {
        glossy: "rounded-full " + "bg-gradient-to-b " + "shadow-[0_6px_0_#2f7d32,0_10px_20px_rgba(0,0,0,0.25)]",
      },
      color: {
        green: "from-lime-400 to-green-600 shadow-[0_6px_0_#2f7d32]",
        orange: "from-orange-400 to-orange-600 shadow-[0_6px_0_#b45309]",
        purple: "from-purple-400 to-purple-600 shadow-[0_6px_0_#6b21a8]",
        blue: "from-cyan-400 to-blue-600 shadow-[0_6px_0_#0284c7]",
      },

      size: {
        start: "h-16 px-12 text-2xl",
        number: "h-20 w-20 text-3xl",
        auto: "h-auto",
      },
    },

    defaultVariants: {
      variant: "glossy",
      size: "start",
      color: "green",
    },
  },
);
export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  color?: "green" | "orange" | "purple" | "blue";
  clickPlaySound?: boolean;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, variant, size, color, onClick, onMouseEnter, clickPlaySound = true, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (clickPlaySound) playButtonSound();
      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      playButtonSound();
      onMouseEnter?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, color }), className)}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      />
    );
  },
);

ActionButton.displayName = "ActionButton";
