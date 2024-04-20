import { useState } from "react";
import { Container, Header } from "../../components";
import {
    GoogleMap,
    InfoWindowF,
    MarkerF,
    useLoadScript,
  } from "@react-google-maps/api";

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
  }
];


export function ExploreMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
      });

      
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker : any) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
      };

    return(
        <Container>
            <Header />
            <div style={{ height: "90vh", width: "100%" }}>
            {isLoaded ? (
            <GoogleMap
              center={{ lat: 40.3947365, lng: 49.6898045 }}
              zoom={10}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "90vh" }}
            >
              {markers.map(({ id, name, position }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  icon={{
                    url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
                    scaledSize: new google.maps.Size(50, 50),
                  }}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <p>{name}</p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
            </div>
        </Container>
    );
}
