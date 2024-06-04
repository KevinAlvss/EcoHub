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
import { UserService } from "../../services/user/UserService";

const api = new UserService();

export function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  
  async function handleRegister(){
    if(!password || !email){
      toast.error("Forneça uma entrada válida")
    }

    if(!nome){
      toast.error("Insira seu nome")
    }

    if(!cpf){
      toast.error("Insira seu cpf")
    }

    if(!birthDate){
      toast.error("Insira sua data de nascimento")
    }

    if(password !== passwordConfirmation){
      toast.error("As senhas não correspondem");
      return;
    }

    const [day, month, year] = birthDate.split('/');

    api.addNewUser({
      cpf: cpf,
      dataNascimento: `${year}-${month}-${day}`,
      email: email,
      nome: nome,
      senha: password
    })
    .then(() => {
      navigate("/my-hubs")
    })
    .catch(e => {
      toast.error("Algum erro ocorreum tente mais tarde")
    })

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
          <ButtonWithIcon img={arrow} width="100%" onClick={async () => await handleRegister()}>
            Cadastre-se
          </ButtonWithIcon>
          <Link to='/use-terms'>Termos de uso e privacidade</Link>
        </LoginContainer>
      </Page>
    </Container>
  );
}
