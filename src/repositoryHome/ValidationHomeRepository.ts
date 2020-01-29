import Mail from '../services/mail'
import { ValidacaoCadastro } from '../model/ValidateResgistered'
export class ValidationHomeRepository {

    createTokenMail = async (session, email) => {
        var randoms = [...Array(3)].map(() =>
            Math.floor(Math.random() * 99 + 1).toFixed(0)
        );
        var posicao = Math.floor(Math.random() * 3 + 0).toFixed(0);
        let numeroEnviado = randoms[posicao];

        let payload = { session_usuario: session, token: numeroEnviado, ativo: 1, ativado: 0 }
        const userCreateTokem = await ValidacaoCadastro.create(payload)
        if (userCreateTokem) {
            Mail.to = email
            Mail.subject = `sda`
            Mail.message = numeroEnviado
            const sendMail = await Mail.sendMail()
            return `teste`
        }

    }

    getTokenMail = async (session) => {

        return await ValidacaoCadastro.findOne({ where: { session_usuario: session } })

    }

}