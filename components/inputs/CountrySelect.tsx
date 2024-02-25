"use client";
import { useCounries } from "@/hooks/store";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import CliComponent from "../CliComponent";
export interface countrySelectValue {
  flag: string;
  value: string;
  latlang: number[];
  region: string;
  label: string;
}

const CountrySelect = ({
  value,
  onChange,
}: {
  onChange: (v: countrySelectValue) => void;
  value: countrySelectValue;
}) => {
  const { getAll } = useCounries();

  return (
    <CliComponent>
      <SearchSelect
        placeholder={value?.label}
        
        className="cursor-pointer placeholder:!text-white tremor-select "
        value={value?.value}
        defaultValue={value?.value}
        onValueChange={(e) => {
          const selected: countrySelectValue = e ? JSON.parse(e) : "";
          onChange(selected || "");
        }}
      >
        {getAll().map((e) => (
          <SearchSelectItem
            className=" cursor-pointer"
            key={e.label}
            value={JSON.stringify(e)}
          >
            {e.flag} {e.label}
          </SearchSelectItem>
        ))}
      </SearchSelect>

    </CliComponent>
  );
};

export default CountrySelect;
