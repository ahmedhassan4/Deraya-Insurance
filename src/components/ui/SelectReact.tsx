import { useEffect, useState } from 'react';
import Select from 'react-select';
import { uniqBy } from 'lodash';
import Label from './label';
import cn from '@/utils/class-names';
import ErrorMessage from './ErrorMessage';
import { useDebounce } from 'use-debounce';

const SelectReact = ({
  label,
  options = [],
  field,
  onChange,
  value,
  isDisabled = false,
  isLoading = false,
  onInputChange,
  className,
  isMulti = false,
  onLoadMore,
  hasMore,
  error,
  isFetching,
  ...props
}: {
  label?: string;
  options?: any[];
  field?: any;
  onChange?: any;
  value?: any;
  isDisabled?: boolean;
  isLoading?: boolean;
  onInputChange?: (value: string) => void;
  isMulti?: boolean;
  className?: string;
  onLoadMore?: any;
  hasMore?: boolean;
  error?: string;
  isFetching?: boolean;
}) => {
  const [valueState, setValueState] = useState<{ label: string; value: string }>();
  const [textSearch, setSearchParams] = useState('');
  const [searchParam] = useDebounce(textSearch, 700);

  useEffect(() => {
    if (onInputChange) {
      onInputChange(searchParam);
    }
  }, [searchParam]);  

  
  useEffect(() => {
    if (value && typeof value !== 'object' && options?.length > 0) {
      const selectedOption = options?.find((option) => option.value === value);
      setValueState(selectedOption);
    }
  }, [value, JSON.stringify(options)]);

  useEffect(() => {
    if (typeof value === 'object') {
      setValueState(value);
    }
  }, [value]);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label className="rizzui-input-label mb-1.5 block text-sm font-medium">
          {label}
        </Label>
      )}
      <Select
        value={valueState}
        {...field}
        options={uniqBy(options, "value")}
        // className="p-5"
        isDisabled={isDisabled}
        onInputChange={(value) => {
          setSearchParams(value);
        }}
        isLoading={isLoading}
        onChange={(value) => {
          onChange(value);
        }}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        hasMore={hasMore}
        onMenuScrollToBottom={onLoadMore}
        isFetching={isLoading || isFetching}
        {...props}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export default SelectReact;