import { useMutation } from "@tanstack/react-query";
import {
  createInsuranceOffer,
  InsuranceOfferRequest,
  InsuranceOfferResponse,
} from "@/services/providersApi";

export const useCreateProvider = () => {
  return useMutation<
    InsuranceOfferResponse, // Success type
    Error, // Error type
    InsuranceOfferRequest // Variables type
  >({
    mutationFn: createInsuranceOffer,
    onSuccess: (data) => {
      console.log("Insurance offer created successfully:", data);
    },
    onError: (error) => {
      console.error("Insurance offer creation failed:", error);
    },
  });
};
