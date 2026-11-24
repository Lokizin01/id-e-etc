export type Usuario = {
    id: number
    nome: string
    email: string
}

export type respostaLogin = {
    accessToken: string
    use: Usuario
}