import { ButtonWithIcon, Container, Header } from "../../components";
import {
  Content,
  ImageContainer,
  InfoContainer,
  Materials,
  RouteContainer,
  RouteTitle,
  ButtonContainer,
} from "./styles";
import hubImage from "../../images/hub-example.png";
import whatsapp from "../../images/whatsapp.svg";
import email from "../../images/email.svg";
import { Link } from "react-router-dom";

export function InspectHub() {
  return (
    <Container>
      <Header />
      <Content>
        <ImageContainer>
          <img src={hubImage} alt="nomeDoHubAqui" />
        </ImageContainer>
        <InfoContainer>
          <h1>Pilhas Edu</h1>
          <Materials>
            Resíduos Eletrônicos, Lâmpadas, Pilhas e Baterias
          </Materials>

          <RouteContainer>
            <RouteTitle>Endereço</RouteTitle>
            <p>Rua do Senac 92</p>
          </RouteContainer>

          <ButtonContainer>
            <ButtonWithIcon img={whatsapp}>Whatsapp</ButtonWithIcon>
            <ButtonWithIcon img={email}>E-mail</ButtonWithIcon>
          </ButtonContainer>

          <Link to="/view-hubs">Voltar</Link>
        </InfoContainer>
      </Content>
    </Container>
  );
}
