"use client";
import React from "react";
import cn from "@/utils/class-names";
import SimpleBar from "simplebar-react";

export interface CardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, className }) => {
  return (
      <div
      className="m-5"
        style={{ height: "calc(100dvh)" }} // 1.5rem top + 1.5rem bottom = 3rem total
      >
        <SimpleBar style={{ height: "100%" }}>
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
