import React from "react";
import cn from "@/utils/class-names"; // Assuming you use shadcn/ui utility

export interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, className }) => {
  return (
    <div className="w-screen h-screen p-8">
      <div
        className={cn(
          "w-full h-full grid md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg overflow-hidden",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default CardLayout;
