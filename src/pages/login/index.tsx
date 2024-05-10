import { Link } from "react-router-dom";
import {
  ButtonWithIcon,
  Container,
  Header,
  InputDefault,
} from "../../components";
import arrow from "../../images/arrow-right.svg";
import { Page, LoginContainer, InputContainer } from "./style";

export function Login() {
  return (
    <Container>
      <Header />
      <Page>
        <LoginContainer>
          <h1>Entre na sua conta</h1>
          <InputContainer>
            <InputDefault placeholder="Email" />
            <InputDefault placeholder="Senha" type="password" />
            <p>
              Não tem uma conta? <Link to="/register"> Crie uma</Link>
            </p>
          </InputContainer>
          <ButtonWithIcon img={arrow} width="100%"> Entrar </ButtonWithIcon>
        </LoginContainer>
      </Page>
    </Container>
  );
}
