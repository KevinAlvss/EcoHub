import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../images/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

import { Dropzone, InputSelect, ItemButton } from "../../components";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

import axios from "axios";
import { useAuth, useMaterial } from "../../contexts";
import { HubService } from "../../services/hub/HubService";
import { toast } from "react-toastify";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
  id: string;
}

const api = new HubService();

let sharedCoordinates = [0, 0];

export function CreateHub() {
  const { materialTypes } = useMaterial();
  const { checkLogin, userId } = useAuth();
  const navigate = useNavigate();
  
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedUf, setSelectedUf] = useState("");

  const [selectedFile, setSelectedFile] = useState<File>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
    })
  }

  async function handleCreate(){

  let selectedImageBase64 : any;

  await getBase64(selectedFile)
    .then(res => {selectedImageBase64 = res})
    .catch(err => console.log(err))

    const request = {
      cep : "99999999",
      cidade : selectedCityName,
      email : email,
      estado : selectedUf,
      idMateriais : materialTypes.map((m) => Number(m) + 1),
      imagem : selectedImageBase64!.toString(),
      nome : name,
      numero : whatsapp,
      usuarioId : userId!,
      latitude: sharedCoordinates[0].toString(),
      longitude: sharedCoordinates[1].toString(),
    }
    

    await api.addNewHub(request).then(() => {
      navigate("/my-hubs", { replace: true });
    })
    .catch(() => {
      toast.error("algum erro ocorreu ao criar seu Hub")
    })
  }

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

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

        <Link to="/my-hubs">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form autoComplete="off">
        <h1>
          Cadastro do <br />
          ponto de coleta
        </h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <div className="map-container">
            <Map latitude={initialPosition[0]} longitude={initialPosition[1]}/>
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

        <button id="form-button" type="button" onClick={() => handleCreate()}>
          Cadastrar ponto de coleta
        </button>
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
