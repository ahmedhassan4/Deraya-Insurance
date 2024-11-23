import React from "react";
import { LineProps } from "@/types/Line";

const Line = ({
  color = "#000",
  thickness = "1px",
  width = "100%",
  marginTop = "32px",
}: LineProps) => {
  return (
    <div
      style={{
        backgroundColor: color,
        height: thickness,
        width: width,
        marginTop: marginTop, // Fixed here (camelCase)
      }}
    ></div>
  );
};

export default Line;
