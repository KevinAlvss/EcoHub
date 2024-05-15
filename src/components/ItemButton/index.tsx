import lamps from "../../images/lamps.svg";
import battery from "../../images/battery.svg";
import eletronics from "../../images/eletronics.svg";
import organics from "../../images/organics.svg";
import paper from "../../images/paper.svg";
import oil from "../../images/kitchen-oil.svg";
import { DefaultButton } from "./styles";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  itemType: "lamp" | "batery" | "eletronic" | "organic" | "paper" | "oil";
}

export function ItemButton(props: Props) {
  return (
    <DefaultButton {...props}>
      {MapTypeAndRender(props)}
    </DefaultButton>
  );
}

function MapTypeAndRender(props: Props){
  switch (props.itemType) {
    case "batery":
      return BatteryContent();
    case "eletronic":
      return EletronicsContent();
    case "lamp":
      return LampContent();
    case "oil":
      return OilContent();
    case "organic":
      return OrganicsContent();
    case "paper" :
      return PaperContent();
    default:
      break;
  }
}



function LampContent() {
  return (
    <div>
      <img src={lamps} alt="lampadas" />
      <p>Lâmpadas</p>
    </div>
  );
}

function BatteryContent() {
  return (
    <div>
      <img src={battery} alt="baterias" />
      <p>Pilhas e Baterias</p>
    </div>
  );
}

function EletronicsContent() {
  return (
    <div>
      <img src={eletronics} alt="calculadora" />
      <p>Residuos Eletrônicos</p>
    </div>
  );
}

function OrganicsContent() {
  return (
    <div>
      <img src={organics} alt="peixe estragado" />
      <p>Residuos Orgânicos</p>
    </div>
  );
}

function PaperContent() {
  return (
    <div>
      <img src={paper} alt="papel" />
      <p>Papéis e Papelão</p>
    </div>
  );
}

function OilContent() {
  return (
    <div>
      <img src={oil} alt="garrafa de óleo" />
      <p>Óleo de Cozinha</p>
    </div>
  );
}