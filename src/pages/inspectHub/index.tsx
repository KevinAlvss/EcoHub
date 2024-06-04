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
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HubService } from "../../services/hub/HubService";
import { GetHub } from "../../services/models/hub/HubModel";

const api = new HubService();

export function InspectHub() {
  const { hubId } = useParams();
  const [hub, setHub] = useState<GetHub>()

  useEffect(() => {
    async function searchHub(){
      const response = await api.getHubById(hubId!);

      setHub(response);
    }

    searchHub();
  }, [hubId])


  return (
    <Container>
      <Header />
      <Content>
        <ImageContainer>
          <img src={hubImage} alt="nomeDoHubAqui" />
        </ImageContainer>
        <InfoContainer>
          <h1>{hub?.nome}</h1>
          <Materials>
            {hub?.materiais.map(({nome}) => {
              const a = nome.toLowerCase()
              return (
                <p>{a + " - "}</p>
              )
            })}
          </Materials>

          <RouteContainer>
            <RouteTitle>Endereço</RouteTitle>
            <p>{hub?.estado} - {hub?.cidade}</p>
            <p>{hub?.pontoReferencia}</p>
          </RouteContainer>

          <ButtonContainer>
            <a href={`/https://wa.me/${hub?.numero}`} target="_blank" rel="noreferrer">
              <ButtonWithIcon img={whatsapp}>Whatsapp</ButtonWithIcon>
            </a>
            <a href={`mailto:${hub?.email}`} target="_blank" rel="noreferrer">
             <ButtonWithIcon img={email}>E-mail</ButtonWithIcon>
            </a>
          </ButtonContainer>

          <Link to="/view-hubs">Voltar</Link>
        </InfoContainer>
      </Content>
    </Container>
  );
}
