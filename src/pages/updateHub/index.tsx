import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import logo from "../../images/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

import { ButtonRed, Dropzone, ItemButton } from "../../components";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

export function UpdateHub() {
  const { hubId } = useParams();

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form autoComplete="off">
        <h1>
          [Nome aqui - ID {hubId}]
        </h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <div className="map-container">
            <Map />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="numero">Numero</label>
              <input type="text" name="numero" id="numero" />
            </div>

            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value={selectedUf}>
                <option value="0">Selecione uma UF</option>

                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" value={selectedCity}>
                <option value="0">Selecione uma cidade</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

            <div id="items-button-wrapper">
              <ItemButton itemType="lamp"/>
              <ItemButton itemType="batery"/>
              <ItemButton itemType="eletronic"/>
              <ItemButton itemType="organic"/>
              <ItemButton itemType="paper"/>
              <ItemButton itemType="oil"/>
            </div>
        </fieldset>

        <button id="form-button" type="submit">Cadastrar ponto de coleta</button>
        <ButtonRed id="delete-button">Deletar ponto de coleta</ButtonRed>
      </form>
    </div>
  );
}

function Map() {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={{ lat: initialPosition[0], lng: initialPosition[1] }}
          zoom={17}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        >
          <MarkerF
            position={{ lat: initialPosition[0], lng: initialPosition[1] }}
            draggable={true}
            onDragEnd={(e) =>
              setInitialPosition([e.latLng!.lat(), e.latLng!.lng()])
            }
          />
        </GoogleMap>
      ) : null}
    </>
  );
}
