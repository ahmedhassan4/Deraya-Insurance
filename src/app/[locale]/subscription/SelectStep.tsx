import SelectReact from "@/components/ui/SelectReact";
import { carsApi } from "@/services/carsApi";
import { uniqBy } from "lodash";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
type OptionType = {
  label: string;
  value: number;
};
const SelectStep = () => {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [searchParam, setSearchParam] = useState("");
  const locale = useLocale();

  useEffect(() => {
    setPage(1);
  }, [searchParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = await carsApi(locale, page, searchParam);

        setMeta(options?.meta);
        setOptions(prevOptions => {
          const newItems =
            options?.data?.map((item: { name: string; id: number }) => ({
              label: item.name,
              value: item.id,
            })) || [];

          return uniqBy([...prevOptions, ...newItems], "value");
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [page, searchParam]);

  return (
    <SelectReact
      options={options}
      hasMore={options.length < meta?.total}
      onLoadMore={() => setPage(page + 1)}
      onInputChange={setSearchParam}
    />
  );
};
export default SelectStep;
