"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
function ResponseWelcome() {
    let data_local = moment
        .tz(Date.now(), "America/Sao_Paulo")
        .format("HH:mm:ss");
    let saudacao;
    if (data_local > "00:00:00" && data_local <= "12:00:00") {
        saudacao = "Bom Dia";
    }
    else if (data_local > "12:00:00" && data_local <= "18:00:00") {
        saudacao = "Boa tarde";
    }
    else if (data_local > "18:00:00") {
        saudacao = "Boa Noite";
    }
    return {
        fulfillmentText: "Olá, " + saudacao + " 😀 \n" +
            "Eu sou a CASSIA, estou aqui para te ajudar nas compras " +
            " de créditos no Bilhete Único e responder algumas " +
            " questões sobre transportes públicos.\n" +
            "Sobre o que vamos falar hoje?"
    };
}
exports.ResponseWelcome = ResponseWelcome;
