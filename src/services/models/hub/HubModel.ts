export interface AddOrUpdateHubRequest {
  nome: string;
  email: string;
  imagem: string;
  numero: string;
  cidade: string;
  estado: string;
  pontoReferencia?: string;
  cep: string;
  usuarioId: string;
  idMateriais: number[];
  latitude: string;
  longitude: string;
}

export interface GetHub {
  id: string;
  nome: string;
  email: string;
  imagem: string;
  numero: string;
  cidade: string;
  estado: string;
  latitude: string;
  longitude: string;
  pontoReferencia?: string;
  cep: string;
  usuarioId: string;
  materiais: Materiais[];
}

export interface Materiais {
  id: number;
  nome: string;
}