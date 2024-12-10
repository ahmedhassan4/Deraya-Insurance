import axios from "axios";

export interface InsuranceOfferRequest {
  service_id: number;
  name: string;
  phone: string;
  email: string;
  date_of_birth?: string; // Only send if service_id === 1
  country?: string; // Only send if service_id === 1
  interested_in?: string; // Only send if service_id === 1
}

export interface InsuranceOfferResponse {
  country?: string;
  date?: Date;
  email: string;
  interestedIn?: string;
  name: string;
  phone: string;
}

export const createInsuranceOffer = async (
  offerData: InsuranceOfferRequest
): Promise<InsuranceOfferResponse> => {
  try {
    const response = await axios.post(
      "https://insurance.incodehub.com/api/v2/services/insurance-offers",
      offerData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to create insurance offer: ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to create insurance offer");
  }
};
