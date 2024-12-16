"use client";
import React from "react";
import cn from "@/utils/class-names";
import SimpleBar from "simplebar-react";
import "./style.css";
export interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, className }) => {
  return (
      <div
      className="p-5 h-screen"
      >
        <SimpleBar 
         className="h-screen">
          <div
            className={cn(
              "w-full h-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-container overflow-hidden",
              className
            )}>
            {children}
          </div>
        </SimpleBar>
      </div>
  );
};

export default CardLayout;
