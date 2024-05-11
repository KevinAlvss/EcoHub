import { Link } from "react-router-dom";
import {
  ButtonWithIcon,
  Container,
  Header,
  InputSelect,
} from "../../components";
import { InputContainer, PageWrapper, TextContainer } from "./styles";
import arrowright from "../../images/arrow-right.svg";

export function SearchEcoHub() {
  return (
    <Container>
      <Header />
      <PageWrapper>
        <InputContainer>
          <h2>Ache um ponto de coleta</h2>
          <InputSelect optionTitle="Selecione o estado" options={["a", "b"]} />
          <InputSelect optionTitle="Selecione a cidade" options={["a", "b"]} />
          <Link to={"/view-hubs"}>
            <ButtonWithIcon img={arrowright}> Pesquisar </ButtonWithIcon>
          </Link>
        </InputContainer>
        <TextContainer>
          <h1>Próximo a você</h1>
          <p>Encontre pontos de coleta perto de você de forma eficiente</p>
        </TextContainer>
      </PageWrapper>
    </Container>
  );
}
