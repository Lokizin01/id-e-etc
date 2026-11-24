import type { respostaLogin } from "../types/Usuario"
import { api } from "./api"


const authService = {
    async logar(email: string, senha: string) {
        const resposta = await api.post<respostaLogin>('login', {email, 'password': senha})
        sessionStorage.setItem('Token', resposta.data.accessToken)
        sessionStorage.setItem('usuario', JSON.stringify(resposta.data.use))
        return resposta.data.use
    }
}

export default authService