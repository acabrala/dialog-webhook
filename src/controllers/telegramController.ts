import { ResponseDefaultTelegram } from "../responsesTelegram/responseDefaultTelegram"

export class TelegramController {
    verifyIntent(req, res, data) {
        switch (data.intentName) {
            case 'Default Welcome Intent':
                console.log('aqui')
                const resposta = ResponseDefaultTelegram(`olá`)
                console.log(resposta);
                
                res.json(resposta)
                return
                break
            case 'identificacao.cpf':
                // const resposta = ResponseDefaultTelegram(`olá`)


                // return res.json(resposta)
                // break;

            default:

                break
        }
    }
}