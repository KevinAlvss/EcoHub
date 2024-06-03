
export interface AddOrUpdateHubRequest {
    nome: string,
    email: string,
    imagem: string,
    numero: string,
    cidade: string,
    estado: string,
    pontoReferencia?: string,
    cep: string,
    usuarioId: string,
    idMateriais: number[]
}

export interface GetHub {
    id: string,
    nome: string,
    email: string,
    imagem: string,
    numero: string,
    cidade: string,
    estado: string,
    pontoReferencia?: string,
    cep: string,
    usuarioId: string,
    idMateriais: number[]
}
