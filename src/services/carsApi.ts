import axios from "axios";

export const carsApi = async (
  page: number,
  searchParam: string
): Promise<any> => {
  try {
    const response = await axios.get(
      "https://insurance.incodehub.com/api/v2/car-makes?page=" +
        page +
        "&name=" +
        searchParam
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Faild To Fetch Service : " + error.message);
    } else {
      throw new Error("Faild To Fetch Service");
    }
  }
};
