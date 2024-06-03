import { useEffect, useState } from "react";
import { ItemButton, Container, Header } from "../../components";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { ButtonWrapper, ButtonsContainer, ComponentsContainer, MapContainer } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import hubImage from "../../images/hub-example.png";
import { useLocation } from "../../contexts/locationContext";
import { useMaterial } from "../../contexts";
import { HubService } from "../../services/hub/HubService";
import { GetHub } from "../../services/models/hub/HubModel";


interface MapProps {
  lat: number | undefined,
  lng: number | undefined,
  hubs: GetHub[],
}

const api = new HubService();

export function ExploreMap() {
  const { location } = useLocation();
  const { materialTypes } = useMaterial();

  const [hubs, setHubs] = useState<GetHub[]>([]);
  const [hubsResponse, setHubsResponse] = useState<GetHub[]>([]);

  useEffect(() => {
    async function searchHubs(){
      const apiResponseHubs = await api.getAllHubs();
  
      setHubs(apiResponseHubs);
      setHubsResponse(apiResponseHubs);

      console.log(apiResponseHubs);
    }

    searchHubs();
  }, [])

  useEffect(() => {
    const filtro = materialTypes.map(m => Number(m) + 1);

    if(filtro.length === 0){
      setHubs(hubsResponse);

      return;
    }

    const filteredHubs = hubs.filter(hub => hub.materiais.some(material => filtro.includes(material.id)))

    setHubs(filteredHubs);
  }, [materialTypes])

  return (
    <Container>
      <Header />
      <ComponentsContainer>
        <MapContainer>
            <Map lat={location?.lat} lng={location?.long} hubs={hubs}/>
        </MapContainer>
        <ButtonsContainer>
          <h1>Bem vindo.</h1>
          <p>Encontre no mapa um ponto de coleta</p>
          <ButtonWrapper>
            <ItemButton itemType="lamp"/>
            <ItemButton itemType="batery"/>
            <ItemButton itemType="eletronic"/>
            <ItemButton itemType="organic"/>
            <ItemButton itemType="paper"/>
            <ItemButton itemType="oil"/>
          </ButtonWrapper>
          <Link to={"/search"}>Voltar</Link>
        </ButtonsContainer>
      </ComponentsContainer>
    </Container>
  );
}

function Map(props : MapProps) {
  const navigate = useNavigate();
  
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });

  const [activeMarker, setActiveMarker] = useState('');

  useEffect(() => {
    if(props.lat !== undefined && props.lng !== undefined){
      setInitialPosition([props.lat, props.lng]);

      return;
    }
    
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
  
        setInitialPosition([latitude, longitude]);
      });
  },[props.lat, props.lng])

  const handleActiveMarker = (marker: string) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    navigate(`/view-hubs/inspect/${marker}`, { replace: true })
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={{ lat: initialPosition[0], lng: initialPosition[1] }}
          zoom={12}
          onClick={() => setActiveMarker('')}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }} 
        >
          {props.hubs.map(hub  => (
            <MarkerF
              key={hub.id}
              position={{ lat: Number(hub.latitude), lng: Number(hub.longitude) }}
              onClick={() => handleActiveMarker(hub.id)}
              icon={{
                url: hubImage,
                scaledSize: new google.maps.Size(50, 50),
              }}
            >
              {activeMarker === hub.id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker('')}>
                  <div>
                    <p>{hub.nome}</p>
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      ) : null}
    </>
  );
}
