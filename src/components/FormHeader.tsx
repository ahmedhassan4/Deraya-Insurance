"use client";
import React from "react";
import Backbutton from "./Backbutton";
import { Text } from "rizzui";
import Line from "@/ui/Line";

interface FormHeaderProps {
  buttonTitle: string;
}

function FormHeader({ buttonTitle }: FormHeaderProps) {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Backbutton title={buttonTitle} />
        <Text className="text-lg">Reset</Text>
      </div>
      <Line marginTop="10px" />
    </>
  );
}

export default FormHeader;
