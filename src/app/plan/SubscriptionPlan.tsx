import Line from "@/ui/Line";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button, Text } from "rizzui";

function SubscriptionPlan() {
  return (
    <div className="w-full">
      <Link href="/services">
        <Button
          variant="text"
          className="text-[#111928] font-normal text-lg flex items-center"
        >
          <BsArrowLeft className="w-5 h-5 mr-2" />
          Back To Services
        </Button>
      </Link>
      <Line marginTop="10px" thickness=".5px" />

      <div className="my-8">
        <Text className="text-4xl font-bold mb-4">Thanks for Submitting</Text>
        <Text className="text-[#6B7280] text-lg">
          Our team will contact you within 24 hours
        </Text>
      </div>

      <div className="plans">
        <Text className="text-[#6B7280] text-lg">
          We found two offers for you
        </Text>
      </div>
    </div>
  );
}

export default SubscriptionPlan;
