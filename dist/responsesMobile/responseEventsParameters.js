"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ResponseEventParameters(evento, parametros) {
    return { followupEventInput: {
            name: evento,
            parameters: Object.assign({}, parametros)
        } };
}
exports.ResponseEventParameters = ResponseEventParameters;
