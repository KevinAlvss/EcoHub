import { ButtonGreen, ButtonWithoutIcon, Container, Header } from "../../components";
import { ButtonContainer, Content, EmptyHubContainer, Hub, Wrapper } from "./styles";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import { HubService } from "../../services/hub/HubService";
import { GetHub } from "../../services/models/hub/HubModel";

const api = new HubService();

export function MyHubs() {
  const { checkLogin, userId } = useAuth();
  const [hubs, setHubs] = useState<GetHub[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    async function fetchHubs(userId: string | undefined) {
      if (userId === undefined) {
        return;
      }

      try {
        const response = await api.getHubsByUser(userId);
        setHubs(response);
      } catch (error) {
        console.error('Failed to fetch hubs:', error);
      }
    }

    fetchHubs(userId);
  }, [userId]);

  return (
    <Container>
      <Header />
      <Wrapper>
        <ButtonContainer>
          <ButtonGreen>
            <Link to="/create-hub">
              Criar hub
            </Link>
          </ButtonGreen>
        </ButtonContainer>
        <Content>{hubs.length === 0 ? <EmptyHubs /> : <RenderHubs hubs={hubs} navigate={navigate} />}</Content>
      </Wrapper>
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

function RenderHubs({ hubs, navigate }: { hubs: GetHub[], navigate: any }) {
  function handleClick(id: string){
    navigate(`/edit-hub/${id}`, { replace: true })
  }

  return (
    <>
      {hubs.map((hub) => {
        const formattedMaterial = hub.materiais.map(m => m.nome.toLowerCase()).join(" , ");

        return (
          <Hub key={hub.id}>
            <div>
              <img src={hub.imagem} alt="nomeDoHubAqui" />
              <h1>{hub.nome}</h1>
              <p>{formattedMaterial}</p>
              <div>
                <strong>Endereço</strong>
                <p>
                  {hub.estado} - {hub.cidade}
                </p>
              </div>
            </div>
            <ButtonWithoutIcon onClick={() => handleClick(hub.id)}>Editar Ponto</ButtonWithoutIcon>
          </Hub>
        );
      })}
    </>
  );
}