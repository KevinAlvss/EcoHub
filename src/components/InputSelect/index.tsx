import React from "react";
import { DefaultOption, DefaultSelect } from "./styles";

interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
    optionTitle: string,
    options: string[],
}

interface OptionProps extends React.HTMLAttributes<HTMLOptionElement> {}

export function InputSelect(
  selectProps: SelectProps,
  optionProps: OptionProps,
) {
  return (
    <DefaultSelect {...selectProps} defaultValue={selectProps.optionTitle}>
      <DefaultOption {...optionProps} disabled selected>{selectProps.optionTitle}</DefaultOption>
      {selectProps.options.map((option) => (
        <>
          <DefaultOption {...optionProps} key={option} value={option}>{option}</DefaultOption>
        </>
      ))}
    </DefaultSelect>
  );
}
