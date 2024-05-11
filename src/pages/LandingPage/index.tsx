import { Link } from "react-router-dom";
import { ButtonWithIcon, Container, Header } from "../../components";
import location from "../../images/location.svg";
import people from "../../images/people.svg";
import login from "../../images/login-icon.svg";
import {
  Page,
  LeftSide,
  RightSide,
  TextContainer,
  ButtonContainer,
  ImgPerson,
} from "./style";

export function LandingPage() {
  return (
    <Container>
      <Header />
      <Page>
        <LeftSide>
          <TextContainer>
            <h1>Seu mapa de coleta de resíduos.</h1>
            <p>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </p>
          </TextContainer>
          <ButtonContainer>
            <Link to={"/search"}>
              <ButtonWithIcon img={location} width="450px">
                Encontrar ponto de coleta
              </ButtonWithIcon>
            </Link>
            <Link to={"/login"}>
              <ButtonWithIcon img={login} width="450px">
                Cadastre um ponto de coleta
              </ButtonWithIcon>
            </Link>
          </ButtonContainer>
        </LeftSide>
        <RightSide>
          <ImgPerson src={people}></ImgPerson>
        </RightSide>
      </Page>
    </Container>
  );
}
