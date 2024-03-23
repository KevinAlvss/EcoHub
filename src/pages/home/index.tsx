import { ButtonGreen } from "../../components/ButtonGreen";
import { ButtonRed } from "../../components/ButtonRed";
import { ButtonWithIcon } from "../../components/ButtonWithIcon";
import { ButtonWithoutIcon } from "../../components/ButtonWithoutIcon";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { InputDefault } from "../../components/InputDefault";
import logo from "../../images/logo.svg";

export function Home() {
  return (
    <Container>
      <Header />
      <ButtonWithIcon img={logo}> teste </ButtonWithIcon>
      <br />
      <ButtonWithoutIcon width="1000px"> teste </ButtonWithoutIcon>
      <br />
      <ButtonWithoutIcon> teste </ButtonWithoutIcon>
      <br />
      <ButtonRed width="900px">teste</ButtonRed>
      <br />
      <ButtonRed>teste</ButtonRed>
      <br />
      <ButtonGreen width="800px">teste</ButtonGreen>
      <br />
      <ButtonGreen>teste</ButtonGreen>
      <br />
      <InputDefault placeholder="Email" width={"1000px"}/>
      <br />
      <br />
      <InputDefault placeholder="Senha" type="password"/>
    </Container>
  );
}
