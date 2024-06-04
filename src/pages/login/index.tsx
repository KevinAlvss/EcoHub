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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function Login() {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if (!token || token === "") {
      return;
    }
    
    navigate("/my-hubs");
    
  },[navigate, token])

  function handleLogin(){
    if(!password || !email){
      toast.error("Forneça uma entrada válida")
    }

    login(email, password)

    navigate("/my-hubs")
  }

  return (
    <Container>
      <Header />
      <Page>
        <LoginContainer>
          <h1>Entre na sua conta</h1>
          <InputContainer>
            <InputDefault placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputDefault placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p>
              Não tem uma conta? <Link to="/register"> Crie uma</Link>
            </p>
          </InputContainer>
          <ButtonWithIcon img={arrow} width="100%" onClick={() => handleLogin()}> Entrar </ButtonWithIcon>
          <Link to='/use-terms'>Termos de uso e privacidade</Link>
        </LoginContainer>
      </Page>
    </Container>
  );
}
