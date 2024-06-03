import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import logo from "../../images/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

import { ButtonRed, Dropzone, InputSelect, ItemButton } from "../../components";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { HubService } from "../../services/hub/HubService";

const api = new HubService();

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
  id: string;
}

export function UpdateHub() {
  const navigate = useNavigate();
  const { hubId } = useParams();

  const { checkLogin } = useAuth();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedUf, setSelectedUf] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [number, setNumber] = useState("");

  function handleUpdate() {}
  function handleDelete(): void {
    api.deleteExistingHub(String(hubId));

    navigate("/my-hubs");

    window.location.reload();
  }

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla).sort();

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "") {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cities = response.data.map((city) => city);

        setCities(cities);
      });
  }, [selectedUf]);

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/my-hubs">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form autoComplete="off">
        <h1>[Nome aqui - ID {hubId}]</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
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
              <input
                type="text"
                name="numero"
                id="numero"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <InputSelect
                optionTitle="Selecione o estado"
                options={ufs}
                onInput={(e) =>
                  setSelectedUf((e.target as HTMLInputElement).value)
                }
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <InputSelect
                optionTitle="Selecione a cidade"
                options={cities.map((c) => c.nome)}
                onInput={(e) =>
                  setSelectedCityName((e.target as HTMLInputElement).value)
                }
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <div id="items-button-wrapper">
            <ItemButton itemType="lamp" />
            <ItemButton itemType="batery" />
            <ItemButton itemType="eletronic" />
            <ItemButton itemType="organic" />
            <ItemButton itemType="paper" />
            <ItemButton itemType="oil" />
          </div>
        </fieldset>

        <button id="form-button" type="button" onClick={() => handleUpdate()}>
          Cadastrar ponto de coleta
        </button>
        <ButtonRed id="delete-button" onClick={() => handleDelete()}>
          Deletar ponto de coleta
        </ButtonRed>
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
