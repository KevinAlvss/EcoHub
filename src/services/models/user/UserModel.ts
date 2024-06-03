
export interface AddOrUpdateUserRequest {
    nome: string,
    cpf: string,
    dataNascimento: Date,
    email: string,
    senha: string
}


export interface GetUser {
    id: string,
    nome: string,
    cpf: string,
    dataNascimento: Date,
    email: string,
    senha: string
}