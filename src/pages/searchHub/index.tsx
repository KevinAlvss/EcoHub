import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ButtonWithIcon,
  Container,
  Header,
  InputSelect,
} from "../../components";
import { InputContainer, PageWrapper, TextContainer } from "./styles";
import arrowright from "../../images/arrow-right.svg";
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

export function SearchEcoHub() {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedUf, setSelectedUf] = useState('');

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla).sort();

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  return (
    <Container>
      <Header />
      <PageWrapper>
        <InputContainer>
          <h2>Ache um ponto de coleta</h2>
          <InputSelect optionTitle="Selecione o estado" options={ufs}  onInput={(e) => setSelectedUf((e.target as HTMLInputElement).value)}/>
          <InputSelect optionTitle="Selecione a cidade" options={cities} onInput={(e) => setSelectedCity((e.target as HTMLInputElement).value)}/>
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
