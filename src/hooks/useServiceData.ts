import { serviceApi } from "@/services/serviceApi";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { ServiceType } from "@/types/service.type";

export const useServiceData = () => {
  const locale = useLocale();

  const { data, isLoading, isError, error } = useQuery<ServiceType[], Error>({
    queryKey: ["services", locale],
    queryFn: () => serviceApi(locale).then((res) => res.data),
    retry: 2,
  });

  return { data, isLoading, isError, error };
};
