import { InputHTMLAttributes } from "react";
import { DefaultInput } from "./styles";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function InputDefault(props: Props) {
  return (
    <DefaultInput {...props} inputWidth={props.width}>
      {props.children}
    </DefaultInput>
  );
}
