import SelectReact from "@/components/ui/SelectReact";
import { carsApi } from "@/services/carsApi";
import { uniqBy } from "lodash";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
type OptionType = {
  label: string;
  value: number;
  models: any[];
};
const SelectStep = () => {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [searchParam, setSearchParam] = useState("");
  const locale = useLocale();
  const [selectedOption, setSelectedOption] = useState<any>(null);
  console.log("selectedOption", selectedOption);
  useEffect(() => {
    setPage(1);
  }, [searchParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = await carsApi(locale, page, searchParam);
        console.log("options", options);
        setMeta(options?.meta);
        setOptions(prevOptions => {
          const newItems =
            options?.data?.map(
              (item: { name: string; id: number; models: any[] }) => ({
                label: item.name,
                value: item.id,
                models: item?.models?.map((model: { name: string }) => ({
                  label: model.name,
                  value: model.name,
                })),
              })
            ) || [];

          return uniqBy([...prevOptions, ...newItems], "value");
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [page, searchParam]);

  return (
    <div className="flex flex-col gap-4">
      <SelectReact
        options={options}
        hasMore={options.length < meta?.total}
        onLoadMore={() => setPage(page + 1)}
        onChange={setSelectedOption}
        onInputChange={setSearchParam}
      />

      <SelectReact
        isDisabled={!Boolean(selectedOption)}
        options={selectedOption?.models || []}
      />
    </div>
  );
};
export default SelectStep;
