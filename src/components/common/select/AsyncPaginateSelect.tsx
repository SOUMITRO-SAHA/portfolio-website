"use client";

import { sleep } from "@/assets";
import type { FilterOptionsType } from "@/assets/admin-constant";
import { cn } from "@/utils";
import * as React from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface AsyncPaginateSelectProps extends AsyncPaginateSelectProps {
  placeholder: string;
  required: boolean;
  options: FilterOptionsType[];
  isMulti?: boolean;
  isClearable?: boolean;
  onBlur?: () => void;
  pagination?: { previous: string; next: string };
}

export const AsyncPaginateSelect: React.FC<AsyncPaginateSelectProps> = (
  props,
) => {
  const {
    placeholder,
    required,
    isMulti = false,
    isClearable = true,
    onBlur,
    options,
    ...rest
  } = props;

  const loadOptions = async (search: string) => {
    await sleep(1000);
    let filteredOptions;
    if (!search) {
      filteredOptions = options;
    } else {
      const searchLower = search?.toLowerCase();

      filteredOptions = options?.filter(({ label }: { label: string }) =>
        label?.toLowerCase()?.includes(searchLower),
      );
    }

    const hasMore = props?.pagination?.next ? true : false;
    return {
      options: filteredOptions,
      hasMore,
    };
  };

  return (
    <>
      <AsyncPaginate
        isClearable={isClearable}
        isMulti={isMulti}
        placeholder={placeholder}
        value={rest.value}
        onChange={rest.onChange}
        loadOptions={loadOptions}
        onBlur={onBlur}
        required={required}
        styles={{
          menuList: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: cn("hsl(var(--background))"),
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: cn(state.isFocused ? "border" : "border-input"),
            backgroundColor: cn("hsl(var(--background))"),
          }),
        }}
      />
    </>
  );
};
