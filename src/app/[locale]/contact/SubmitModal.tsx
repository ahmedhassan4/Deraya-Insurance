import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { Button, Text } from "rizzui";

const SubmitModal = ({ closeModal }: any) => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-7 py-5">
      <div className="w-20 h-20 bg-[#E3ECAC] rounded-full flex items-center justify-center">
        <FaCheck size={35} className=" h-15 w-15 text-[#B5BE34]" />
      </div>
      <Text className="text-center text-2xl font-semibold mt-3">
        Thanks for Submitting
      </Text>

      <Text className="text-xs text-[#6B7280] mt-2">
        Our team will contact you within 24 hours
      </Text>

      <Link href="https://insurance.deraya.net/">
        <Button
          isLoading={false}
          onClick={closeModal}
          className="w-28 mt-5 hover:bg-[#8a9031]"
        >
          Continue
        </Button>
      </Link>
    </div>
  );
};

export default SubmitModal;
