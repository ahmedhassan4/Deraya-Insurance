"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import cn from "@/utils/class-names";
interface LeftSectionProps {
  children: React.ReactNode;
  className?: string;
}
interface LeftSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const LeftSection: React.FC<LeftSectionProps> = ({
  children,
  className,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Drawer Toggle Button for Small Screens */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className={cn(
          "lg:hidden fixed top-1/2 -translate-y-1/2 z-50 text-white p-0 shadow-lg transition-all duration-300 left-0",
          isDrawerOpen ? "bg-white text-[#B5BE34] hidden" : "bg-[#B5BE34]"
        )}
        style={{
          width: "25px",
          height: "50px",
          borderRadius: "0 50px 50px 0",
        }}
      >
        {isDrawerOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      {/* Drawer Content */}
      <div
        className={cn(
          "relative z-40 transition-transform duration-300",
          // Ensure visibility on large screens
          "lg:block lg:col-span-1",
          // Mobile drawer styling
          "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-4/5 max-lg:shadow-2xl max-lg:bg-[#B5BE34]",
          isDrawerOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
          // Default styling from original component
          "bg-[#B5BE34] bg-[url('/Main.png')] bg-cover rounded-lg bg-center py-8 px-[32px]",
          className
        )}
      >
        <div className="relative h-full">
          {/* Close button for drawer */}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="lg:hidden absolute   top-1/2 -translate-y-1/2 right-[-60px]  bg-white p-4 rounded-full"
          >
            <ChevronLeft size={20} color="#B5BE34" />
          </button>

          {children}
        </div>
      </div>

      {/* Overlay for drawer */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};
