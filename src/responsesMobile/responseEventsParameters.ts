export function ResponseEventParameters(evento, parametros){

    return { followupEventInput: {
         name: evento,
         parameters: {...parametros}
     }}
 
 }