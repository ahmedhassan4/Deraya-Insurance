import { useRouter } from "next/navigation";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { Button } from "rizzui";

interface BackButtonProps {
  title: string;
}

function Backbutton({ title }: BackButtonProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="flex items-center ">
      <Button variant="text" className="text-lg p-0" onClick={handleGoBack}>
        <GoArrowLeft className="h-5 w-5 me-2 " />
        {title}
      </Button>
    </div>
  );
}

export default Backbutton;
