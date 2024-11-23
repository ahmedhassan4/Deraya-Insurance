"use client";
import React, { useState } from "react";
import cn from "@/utils/class-names"; // Assuming you use shadcn/ui utility
import { Drawer } from "rizzui";

export interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Split children into left and right sections
  const childrenArray = React.Children.toArray(children);
  const leftSection = childrenArray[0];
  const rightSection = childrenArray[1];

  return (
    <div className="h-screen w-full p-4 sm:p-6 lg:p-12">
      {/* Desktop Layout */}
      <div
        className={cn(
          "w-full h-full grid grid-cols-1 lg:grid-cols-5 bg-white rounded-lg shadow-lg overflow-hidden hidden md:grid",
          className
        )}
      >
        {children}
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="md:hidden">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-4 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Right Section Content */}
          <div className="w-full">{rightSection}</div>
        </div>

        {/* Drawer for Left Section */}
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="left"
          size="md"
        >
          <div className="h-full">{leftSection}</div>
        </Drawer>
      </div>
    </div>
  );
};

export default CardLayout;
