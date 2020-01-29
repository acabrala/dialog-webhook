export function ResponseQuickDefault(mensagem, quick) {
   
    return {
         payload: {
           google: {
             expectUserResponse: true,
             richResponse: {
               items: [
                 {
                   simpleResponse: {
                     textToSpeech: mensagem
                   }
                 }
               ],
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