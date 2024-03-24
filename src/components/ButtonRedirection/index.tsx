import { DefaultButton, ImageContainer } from "./styles";

import email from "../../images/email.svg";
import whatsapp from "../../images/whatsapp.svg";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  redirectionType: "whatsapp" | "email";
  url: string;
}

export function ButtonRedirection(props: Props) {
  return (
    <DefaultButton {...props} onClick={() => redirect(props.url)}>
      {props.redirectionType === "email" ? <WhatsAppButton /> : <EmailButton />}
    </DefaultButton>
  );
}

function WhatsAppButton() {
  return (
    <>
      <ImageContainer>
        <img src={whatsapp} alt="whatsapp-logo" />
        <p>WhatsApp</p>
      </ImageContainer>
    </>
  );
}

function EmailButton() {
  return (
    <>
      <ImageContainer>
        <img src={email} alt="email-logo" />
        <p>Email</p>
      </ImageContainer>
    </>
  );
}

function redirect(url : string){
    window.open(url, '_blank');
}