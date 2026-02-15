import React, { useRef, useState } from "react";
import { useClickOutside } from "@/libs/hooks/useClickOutside";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  menuClassName?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, children, className = "", menuClassName = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-2 z-50 min-w-[200px] bg-white rounded-xl shadow-xl border-2 border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-5 ${menuClassName}`}
          onClick={() => setIsOpen(false)} // Optional: Close on item click
        >
          {children}
        </div>
      )}
    </div>
  );
};
