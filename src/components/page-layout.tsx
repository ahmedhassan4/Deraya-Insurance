// SplitCard.types.ts

// SplitCard.tsx
import React from "react";
import { CardProps } from "@/types/card";

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  contentClassName = "",
  gradient = {
    from: "from-lime-400",
    to: "to-lime-500",
  },
}) => {
  return (
    <div className={`w-full max-w-6xl mx-auto p-4 ${className}`}>
      <div className="grid md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left section with gradient background */}
        <div
          className={`bg-gradient-to-br ${gradient.from} ${gradient.to} p-8`}
        >
          <h2
            className={`text-2xl font-bold text-white mb-4 ${titleClassName}`}
          >
            {title}
          </h2>
          <p className={`text-white/90 ${descriptionClassName}`}>
            {description}
          </p>
        </div>

        {/* Right section for content */}
        <div className={`p-8 bg-white ${contentClassName}`}>{children}</div>
      </div>
    </div>
  );
};

export default Card;
