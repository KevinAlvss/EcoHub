import { useState } from "react";
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

const markers = [
  {
    id: 1,
    name: "Qobustan",
    position: { lat: 40.0709493, lng: 49.3694411 },
  },
  {
    id: 2,
    name: "Sumqayit",
    position: { lat: 40.5788843, lng: 49.5485073 },
  },
  {
    id: 3,
    name: "Baku",
    position: { lat: 40.3947365, lng: 49.6898045 },
  },
];

export function ExploreMap() {
  return (
    <Container>
      <Header />
      <ComponentsContainer>
        <MapContainer>
            <Map />
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

function Map() {
  const navigate = useNavigate();
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });

  const [activeMarker, setActiveMarker] = useState(0);

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    navigate('/inspect', { replace: true })
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={{ lat: 40.3947365, lng: 49.6898045 }}
          zoom={10}
          onClick={() => setActiveMarker(0)}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        >
          {markers.map(({ id, name, position }) => (
            <MarkerF
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              icon={{
                url: hubImage,
                scaledSize: new google.maps.Size(50, 50),
              }}
            >
              {activeMarker === id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(0)}>
                  <div>
                    <p>{name}</p>
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
