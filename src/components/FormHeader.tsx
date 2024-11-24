"use client";
import React from "react";
import Backbutton from "./Backbutton";
import { Text } from "rizzui";
import Line from "@/ui/Line";

function FormHeader() {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Backbutton />
        <Text className="text-lg">Reset</Text>
      </div>
      <Line marginTop="10px" />
    </>
  );
}

export default FormHeader;
