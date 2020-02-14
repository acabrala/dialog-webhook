"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ResponseDefaultTelegram(mensagem) {
    return {
        payload: {
            telegram: {
                text: mensagem,
                parse_mode: 'html'
            }
        }
    };
}
exports.ResponseDefaultTelegram = ResponseDefaultTelegram;
