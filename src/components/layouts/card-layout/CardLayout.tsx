"use client";
import React from "react";
import cn from "@/utils/class-names";
import "./style.css";
export interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, className }) => {
  return (
      <div
      className="p-5 overflow-auto"
      >
        {/* <SimpleBar 
         className="h-[100%]"> */}
          <div
            className={cn(
              "w-full h-[96vh] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-container",
              className
            )}>
            {children}
          </div>
        {/* </SimpleBar> */}
      </div>
  );
};

export default CardLayout;
