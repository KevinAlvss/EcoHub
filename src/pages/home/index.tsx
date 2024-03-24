import {
  ButtonGreen,
  ButtonRed,
  ButtonWithIcon,
  ButtonWithoutIcon,
  Container,
  Header,
  InputDefault,
  InputSelect,
} from "../../components";
import logo from "../../images/logo.svg";

export function Home() {
  const options = ["Opção 1", "Opção 2", "Opção 3", "Opção 4"];
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
      <InputDefault placeholder="Email" width={"1000px"} />
      <br />
      <br />
      <InputDefault placeholder="Senha" type="password" />
      <br />
      <br />
      <InputSelect optionTitle="Selecione a cidade" options={options} />
    </Container>
  );
}
