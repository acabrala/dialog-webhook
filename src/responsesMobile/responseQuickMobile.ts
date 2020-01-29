export function ResponseQuickSeuSaldo(mensagem, quick) {
   
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
       }
 
 }