export function url_default(origem: string, destino: string, key: string) {
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&language=pt-BR&key=${key}`
}
export function url_onibus(origem: string, destino: string, key: string) {
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=bus&language=pt-BR&key=${key}`
}

export function url_trem(origem: string, destino: string, key: string) {
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=train&language=pt-BR&key=${key}`
}

export function url_trem_metro(origem: string, destino: string, key: string) {
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=train|subway&language=pt-BR&key=${key}`
}

export function url_metro_onibus(origem: string, destino: string, key: string) {
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=subway|bus&language=pt-BR&key=${key}`
}

export function url_trem_onibus(origem: string, destino: string, key: string) {
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=train|bus&language=pt-BR&key=${key}`
}

export function url_metro(origem: string, destino: string, key: string) {
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=subway&language=pt-BR&key=${key}`
}
// module.exports = {
//     url_base: ,
//     url_base_metro: ,
//     url_base_trem: ;
//     url_base_onibus: ,
// } 