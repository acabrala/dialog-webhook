import Mail from '../services/mail'
import { ValidacaoCadastro } from '../model/ValidateResgistered'
export class ValidationMobileRepository {

    createTokenMail = async (session, email, token) => {

        let payload = { session_usuario: session, token: token, ativo: 1, ativado: 0 }
        const userCreateTokem = await ValidacaoCadastro.create(payload)
        console.log(userCreateTokem)
        if (userCreateTokem) {
            Mail.to = email
            Mail.subject = `sda`
            Mail.message = token
            const sendMail = await Mail.sendMail()
            return `teste`
        }

    }

    getTokenMail = async (session) => {

        return await ValidacaoCadastro.findOne({ where: { session_usuario: session } })

    }

}