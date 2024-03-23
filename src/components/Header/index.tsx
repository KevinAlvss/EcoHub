import logo from "../../images/logo.svg";
import { GreenText, Wrapper } from "./styles";

export function Header() {
  return (
    <Wrapper>
      <img src={logo} alt="ecohub-logo" />
      <GreenText>Eco</GreenText>
      <h1>Hub</h1>
    </Wrapper>
  );
}
