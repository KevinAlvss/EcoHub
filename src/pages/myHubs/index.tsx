import { ButtonWithoutIcon, Container, Header } from "../../components";
import { Content, EmptyHubContainer, Hub } from "./styles";
import hubImage from "../../images/hub-example.png";

const hubs: any[] = [
  {
    name: "Pilhas Edu",
    materials: "Resíduos Eletrônicos, Lâmpadas, Pilhas e Baterias",
    address: {
      street: "Rua do Senac",
      number: "91",
    },
    image: hubImage,
  },
  {
    name: "Pilhas Edu",
    materials: "Resíduos Eletrônicos, Lâmpadas, Pilhas e Baterias",
    address: {
      street: "Rua do Senac",
      number: "92",
    },
    image: hubImage,
  },
  {
    name: "Pilhas Edu",
    materials: "Resíduos Eletrônicos, Lâmpadas, Pilhas e Baterias",
    address: {
      street: "Rua do Senac",
      number: "93",
    },
    image: hubImage,
  },
];

export function MyHubs() {
  return (
    <Container>
      <Header />
      <Content>{hubs.length === 0 ? EmptyHubs() : RenderHubs()}</Content>
    </Container>
  );
}

function EmptyHubs() {
  return (
    <EmptyHubContainer>
      <p>{`No momento você não possue pontos de coleta :(`}</p>
      <ButtonWithoutIcon>Adicionar Novo Ponto</ButtonWithoutIcon>
    </EmptyHubContainer>
  );
}

function RenderHubs() {
  return hubs.map((hub) => {
    return (
      <Hub>
        <img src={hub.image} alt="nomeDoHubAqui" />
        <h1>{hub.name}</h1>
        <p>{hub.materials}</p>
        <div>
          <strong>Endereço</strong>
          <p>
            {hub.address.street} - {hub.address.number}
          </p>
        </div>
        <ButtonWithoutIcon>Editar Ponto</ButtonWithoutIcon>
      </Hub>
    );
  });
}
