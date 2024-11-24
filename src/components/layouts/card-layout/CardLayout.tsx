"use client";
import React, { useState } from "react";
import cn from "@/utils/class-names";
import { Drawer } from "rizzui";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const leftSection = childrenArray[0];
  const rightSection = childrenArray[1];

  return (
    <div className="h-screen w-full p-4 sm:p-6 lg:p-12">
      <div
        className={cn(
          "w-full h-full grid-cols-1 lg:grid-cols-9 bg-white rounded-lg shadow-lg overflow-hidden hidden lg:grid",
          className
        )}
      >
        {children}
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden h-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <div className="w-full h-full">{rightSection}</div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "fixed top-1/2 -translate-y-1/2 z-50 bg-white p-2 shadow-md hover:bg-gray-50 transition-all duration-300",
              isOpen
                ? "left-[calc(100%-1px)] rounded-r-lg"
                : "left-0 rounded-r-lg"
            )}
            style={{
              boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <BiChevronLeft className="w-6 h-6 text-gray-600" />
            ) : (
              <BiChevronRight className="w-6 h-6 text-gray-600" />
            )}
          </button>

          <Drawer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            placement="left"
            size="md"
            className="shadow-xl"
          >
            <div className="h-full">{leftSection}</div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
