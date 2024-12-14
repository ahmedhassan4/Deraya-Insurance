import axios from "axios";

export interface InsuranceOfferSuccessResponse {
  data: {
    id: number;
    name: string;
    partner: {
      id: number;
      name: string;
      logo: string;
    };
    price: {
      amount: number;
      currency: string;
      formatted: string;
    };
    details: {
      title: string;
      bullets: {
        text: string;
        is_included: boolean;
        tooltip: string;
        order: number;
      }[];
    }[];
    offer_type: string;
    service_id: number;
  }[];
}

export interface InsuranceOfferMessageResponse {
  message: string;
}

// The response can be either success (with data array) or message
export type InsuranceOfferResponse =
  | InsuranceOfferSuccessResponse
  | InsuranceOfferMessageResponse;
  
export interface InsuranceOfferRequest {
  service_id: number;
  name: string;
  phone: string;
  email: string;
  date_of_birth?: string;
  country?: string;
  interested_in?: string;
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
