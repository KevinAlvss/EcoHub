import { Link, useNavigate } from "react-router-dom";
import {
  ButtonWithIcon,
  Container,
  Header,
  InputDefault,
} from "../../components";
import arrow from "../../images/arrow-right.svg";
import { Page, LoginContainer, InputContainer } from "./style";
import { useState } from "react";
import InputMask from 'react-input-mask';
import { toast } from "react-toastify";

export function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  
  function handleRegister(){
    if(password !== passwordConfirmation){
      toast.error("As senhas não correspondem");
      return;
    }

    navigate("/my-hubs")
  }

  return (
    <Container>
      <Header />
      <Page>
        <LoginContainer>
          <h1>Crie sua conta</h1>
          <InputContainer>
            <InputDefault placeholder="Nome" value={nome} onChange={(e) => {setNome(e.target.value)}}/>
            <InputDefault placeholder="Cpf" value={cpf} onChange={(e) => {setCpf(e.target.value)}}/>
            <InputMask mask="99/99/9999" placeholder="Data de nascimento" value={birthDate} onChange={(e) => {setBirthDate(e.target.value)}}/>
            <InputDefault placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <InputDefault placeholder="Senha" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <InputDefault placeholder="Confirme sua senha" type="password" value={passwordConfirmation} onChange={(e) => {setPasswordConfirmation(e.target.value)}}/>
            <p>
              Já tem uma conta? <Link to="/login">Entre aqui</Link>
            </p>
          </InputContainer>
          <ButtonWithIcon img={arrow} width="100%" onClick={() => handleRegister()}>
            Cadastre-se
          </ButtonWithIcon>
        </LoginContainer>
      </Page>
    </Container>
  );
}
