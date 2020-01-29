export function ResponseDefaultTelegram(mensagem) {
   
    return {
         payload: {
           telegram: {
              text: mensagem,
              parse_mode: 'html'
           }
         }
       }
 
 }