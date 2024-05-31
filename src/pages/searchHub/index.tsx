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
import { useLocation } from "../../contexts/locationContext";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
  id: string;
}

interface IBGELocationResponse {
  latitude: number;
  longitude: number;
}


export function SearchEcoHub() {
  const { setLocation } = useLocation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [selectedCityName, setSelectedCityName] = useState('');
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
        const cities = response.data.map(city => city);

        setCities(cities);
      });
  }, [selectedUf]);

  useEffect(() => {
    if(selectedCityName === ''){
      return;
    }

    const city = cities.filter((city) => city.nome === selectedCityName)[0];

    axios
    .get<IBGELocationResponse[]>(`https://servicodados.ibge.gov.br/api/v1/bdg/municipio/${city.id}/estacoes`)
    .then(response => {
      setLocation({
        lat: response.data[0].latitude,
        long: response.data[0].longitude
      });
    });
  }, [cities, selectedCityName, setLocation])

  return (
    <Container>
      <Header />
      <PageWrapper>
        <InputContainer>
          <h2>Ache um ponto de coleta</h2>
          <InputSelect optionTitle="Selecione o estado" options={ufs}  onInput={(e) => setSelectedUf((e.target as HTMLInputElement).value)}/>
          <InputSelect optionTitle="Selecione a cidade" options={cities.map(c => c.nome)} onInput={(e) => setSelectedCityName((e.target as HTMLInputElement).value)}/>
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
