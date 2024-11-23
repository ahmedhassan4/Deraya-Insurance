import React from "react";
import cn from "@/utils/class-names"; // Assuming you use shadcn/ui utility

export interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, className }) => {
  return (
    <div className="h-screen w-full p-4 sm:p-6 lg:p-12">
      <div
        className={cn(
          "w-full h-full grid grid-cols-1 lg:grid-cols-5 bg-white rounded-lg shadow-lg overflow-hidden",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default CardLayout;
