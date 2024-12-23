import axios from "axios";

export interface GetInTouchRequest {
  name: string;
  phone: string;
  email: string;
  fra_registered_broker: boolean;
}

export interface GetInTouchResponse {
  message: string;
}

export const createGetInTouchRequest = async (
  data: GetInTouchRequest
): Promise<GetInTouchResponse> => {
  try {
    const response = await axios.post(
      "https://insurance.incodehub.com/api/v2/get-in-touch",
      data,
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
        `Failed to submit contact form: ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to submit contact form");
  }
};
