"use client";
import React from "react";
import cn from "@/utils/class-names";

export interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, className }) => {
  return (
    <div className="h-screen w-full p-4 sm:p-6 lg:p-6">
      <div
        className={cn(
          "w-full h-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-contaienr overflow-hidden overflow-y-auto",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default CardLayout;