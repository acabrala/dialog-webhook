"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseDefaultTelegram_1 = require("../responsesTelegram/responseDefaultTelegram");
class TelegramController {
    verifyIntent(req, res, data) {
        switch (data.intentName) {
            case 'Default Welcome Intent':
                console.log('aqui');
                const resposta = responseDefaultTelegram_1.ResponseDefaultTelegram(`olá`);
                console.log(resposta);
                res.json(resposta);
                return;
                break;
            case 'identificacao.cpf':
            // const resposta = ResponseDefaultTelegram(`olá`)
            // return res.json(resposta)
            // break;
            default:
                break;
        }
    }
}
exports.TelegramController = TelegramController;
