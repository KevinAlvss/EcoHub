import { Link, useNavigate } from "react-router-dom";
import {
  ButtonWithIcon,
  Container,
  Header,
  InputDefault,
} from "../../components";
import arrow from "../../images/arrow-right.svg";
import { Page, LoginContainer, InputContainer } from "./style";
import { useAuth } from "../../contexts/authContext";

export function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(){
    login()
    navigate("/my-hubs")
  }

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
          <ButtonWithIcon img={arrow} width="100%" onClick={() => handleLogin()}> Entrar </ButtonWithIcon>
        </LoginContainer>
      </Page>
    </Container>
  );
}
