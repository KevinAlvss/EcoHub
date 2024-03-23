import { DefaultButton } from "./styles";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  width?: string | undefined;
}

export function ButtonGreen(props: Props) {
  return (
    <DefaultButton {...props} width={props.width}>
      {props.children}
    </DefaultButton>
  );
}
