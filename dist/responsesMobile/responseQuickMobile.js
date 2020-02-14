"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ResponseQuickSeuSaldo(mensagem, quick) {
    return {
        fulfillmentText: mensagem,
        payload: {
            google: {
                expectUserResponse: true,
                richResponse: {
                    // items: [
                    //   {
                    //     simpleResponse: {
                    //       textToSpeech: `Escolha qual bilhete você deseja carregar`
                    //     }
                    //   }
                    // ],
                    suggestions: quick,
                    linkOutSuggestion: {
                        destinationName: "Website",
                        url: "https://assistant.google.com"
                    }
                }
            }
        }
    };
}
exports.ResponseQuickSeuSaldo = ResponseQuickSeuSaldo;
