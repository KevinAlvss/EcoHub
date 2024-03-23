import { DefaultButton, ImageContainer, TextContainer } from "./styles";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  img: string;
}

export function ButtonWithIcon(props : Props) {
  return (
    <DefaultButton {...props}>
      <ImageContainer>
        <img src={props.img} alt="button-icon"/>
      </ImageContainer>
      <TextContainer>
        {props.children}
      </TextContainer>
    </DefaultButton>
  );
}
