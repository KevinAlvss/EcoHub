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
import { GetHub } from "../../services/models/hub/HubModel";
import { useMaterial } from "../../contexts";
import { toast } from "react-toastify";

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

let sharedCoordinates = [0, 0];

export function UpdateHub() {
  const { hubId } = useParams();
  const navigate = useNavigate();
  const { checkLogin, userId } = useAuth();
  const { materialTypes } = useMaterial();

  const [hub, setHub] = useState<GetHub | undefined>();
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedUf, setSelectedUf] = useState("");

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  const [selectedFile, setSelectedFile] = useState<File>();

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
      sharedCoordinates = [latitude, longitude];
    });
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    async function searchHub() {
      const response = await api.getHubById(hubId!);

      setHub(response);
    }

    searchHub();

    setName(hub?.nome!)
    setEmail(hub?.email!)
    setNumber(hub?.numero!)
  }, [hub?.email, hub?.nome, hub?.numero, hubId]);

  async function handleUpdateHub() {
    if (!selectedCityName) {
      toast.error("selecione uma cidade");
      return;
    }

    if (!selectedUf) {
      toast.error("selecione um estado");
      return;
    }

    if (!name || name === "") {
      setName(hub?.nome!);
    }

    if (!email || email === "") {
      setEmail(hub?.email!);
    }

    if (!number || number === "") {
      setNumber(hub?.numero!);
    }

    const request = {
      cep: "45678543",
      cidade: selectedCityName,
      email: hub?.email!,
      estado: hub?.estado!,
      imagem: hub?.imagem!,
      nome: hub?.nome!,
      numero: hub?.numero!,
      usuarioId: userId!,
      idMateriais: materialTypes.map((m) => Number(m) + 1),
      latitude: sharedCoordinates[0].toString(),
      longitude: sharedCoordinates[1].toString(),
    }

    console.log(request);

    await api
      .updateExistingHub(
        request,
        hubId!
      )
      .then(() => {
        navigate("/my-hubs", { replace: true });
      })
      .catch(() => {
        toast.error("algum erro ocorreu ao atualizar seu Hub")
      });
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
        <h1>{hub?.nome}</h1>

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
              placeholder={hub?.nome}
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
                placeholder={hub?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                placeholder={hub?.numero}
                onChange={(e) => setNumber(e.target.value)}
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
            <Map latitude={initialPosition[0]} longitude={initialPosition[1]} />
          </div>

          <div className="field-group">
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

        <button
          id="form-button"
          type="button"
          onClick={async () => await handleUpdateHub()}
        >
          Salvar ponto de coleta
        </button>
        <ButtonRed id="delete-button">Deletar ponto de coleta</ButtonRed>
      </form>
    </div>
  );
}

function Map({ latitude, longitude }: { latitude: number; longitude: number }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={{ lat: latitude, lng: longitude }}
          zoom={17}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        >
          <MarkerF
            position={{ lat: latitude, lng: longitude }}
            draggable={true}
            onDragEnd={(e) =>
              (sharedCoordinates = [e.latLng!.lat(), e.latLng!.lng()])
            }
          />
        </GoogleMap>
      ) : null}
    </>
  );
}
