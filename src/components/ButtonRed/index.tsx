import { DefaultButton } from "./styles";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  width?: string | undefined;
}

export function ButtonRed(props: Props) {
  return (
    <DefaultButton type="button" {...props} width={props.width}>
      {props.children}
    </DefaultButton>
  );
}
