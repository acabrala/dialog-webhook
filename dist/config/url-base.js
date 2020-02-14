"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function url_default(origem, destino, key) {
    return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&language=pt-BR&key=${key}`;
}
exports.url_default = url_default;
function url_onibus(origem, destino, key) {
    return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=bus&language=pt-BR&key=${key}`;
}
exports.url_onibus = url_onibus;
function url_trem(origem, destino, key) {
    return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=train&language=pt-BR&key=${key}`;
}
exports.url_trem = url_trem;
function url_trem_metro(origem, destino, key) {
    return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=train|subway&language=pt-BR&key=${key}`;
}
exports.url_trem_metro = url_trem_metro;
function url_metro_onibus(origem, destino, key) {
    return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=subway|bus&language=pt-BR&key=${key}`;
}
exports.url_metro_onibus = url_metro_onibus;
function url_trem_onibus(origem, destino, key) {
    return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=train|bus&language=pt-BR&key=${key}`;
}
exports.url_trem_onibus = url_trem_onibus;
function url_metro(origem, destino, key) {
    return `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&alternatives=true&mode=transit&transit_mode=subway&language=pt-BR&key=${key}`;
}
exports.url_metro = url_metro;
// module.exports = {
//     url_base: ,
//     url_base_metro: ,
//     url_base_trem: ;
//     url_base_onibus: ,
// } 
