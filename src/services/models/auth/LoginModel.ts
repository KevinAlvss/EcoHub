export interface LoginModelRequest {
  email: string;
  senha: string;
}

export interface LoginModelResponse {
  token: string;
  idUsuario: string;
}
