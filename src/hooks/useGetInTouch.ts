import { useMutation } from "@tanstack/react-query";
import {
  createGetInTouchRequest,
  GetInTouchRequest,
  GetInTouchResponse,
} from "../services/getInTouchApi";

export const useGetInTouch = () => {
  return useMutation<GetInTouchResponse, Error, GetInTouchRequest>({
    mutationFn: createGetInTouchRequest,
  });
};
