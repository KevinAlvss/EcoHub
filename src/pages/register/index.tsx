import { Link } from "react-router-dom";
import {
  ButtonWithIcon,
  Container,
  Header,
  InputDefault,
} from "../../components";
import arrow from "../../images/arrow-right.svg";
import { Page, LoginContainer, InputContainer } from "./style";

export function Register() {
  return (
    <Container>
      <Header />
      <Page>
        <LoginContainer>
          <h1>Crie sua conta</h1>
          <InputContainer>
            <InputDefault placeholder="Email" />
            <InputDefault placeholder="Cpf" />
            <InputDefault placeholder="Data de nascimento" />
            <InputDefault placeholder="Email" />
            <InputDefault placeholder="Senha" type="password" />
            <InputDefault placeholder="Confirme sua senha" type="password" />
            <p>
              Já tem uma conta? <Link to="/login">Entre aqui</Link>
            </p>
          </InputContainer>
          <ButtonWithIcon img={arrow} width="100%">
            Cadastre-se
          </ButtonWithIcon>
        </LoginContainer>
      </Page>
    </Container>
  );
}
