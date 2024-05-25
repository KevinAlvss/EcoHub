import { ButtonGreen, ButtonWithoutIcon, Container, Header } from "../../components";
import { ButtonContainer, Content, EmptyHubContainer, Hub } from "./styles";
import hubImage from "../../images/hub-example.png";
import { Link, useNavigate } from "react-router-dom";

const hubs: any[] = [
  {
    id: 1,
    name: "Pilhas Edu",
    materials: "Resíduos Eletrônicos, Lâmpadas, Pilhas e Baterias",
    address: {
      street: "Rua do Senac",
      number: "91",
    },
    image: hubImage,
  },
  {
    id: 2,
    name: "Pilhas Edu",
    materials: "Resíduos Eletrônicos, Lâmpadas, Pilhas e Baterias",
    address: {
      street: "Rua do Senac",
      number: "92",
    },
    image: hubImage,
  },
  {
    id: 3,
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
      <ButtonContainer>
        <ButtonGreen>
          <Link to="/create-hub">
            Adicionar Novo Ponto
          </Link>
        </ButtonGreen>
      </ButtonContainer>
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
  const navigate = useNavigate();

  function handleClick(id: string){
    navigate(`/edit-hub/${id}`, { replace: true })
  }

  return hubs.map((hub) => {
    return (
      <Hub>
        <div>
          <img src={hub.image} alt="nomeDoHubAqui" />
          <h1>{hub.name}</h1>
          <p>{hub.materials}</p>
          <div>
            <strong>Endereço</strong>
            <p>
              {hub.address.street} - {hub.address.number}
            </p>
          </div>
        </div>
        <ButtonWithoutIcon onClick={() => handleClick(hub.id)}>Editar Ponto</ButtonWithoutIcon>
      </Hub>
    );
  });
}
