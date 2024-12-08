import axios from "axios";
import { ServiceResponse } from "@/types/service.type";

export const serviceApi = async (locale: string): Promise<ServiceResponse> => {
  try {
    const response = await axios.get(
      "https://insurance.incodehub.com/api/v2/services",
      {
        headers: {
          "X-LOCALE": locale,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error("Faild To Fetch Service : " + error.message);
  }
};
