"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = require("../services/mail");
const ValidateResgistered_1 = require("../model/ValidateResgistered");
class ValidationMobileRepository {
    constructor() {
        this.createTokenMail = (session, email, token) => __awaiter(this, void 0, void 0, function* () {
            let payload = { session_usuario: session, token: token, ativo: 1, ativado: 0 };
            const userCreateTokem = yield ValidateResgistered_1.ValidacaoCadastro.create(payload);
            console.log(userCreateTokem);
            if (userCreateTokem) {
                mail_1.default.to = email;
                mail_1.default.subject = `sda`;
                mail_1.default.message = token;
                const sendMail = yield mail_1.default.sendMail();
                return `teste`;
            }
        });
        this.getTokenMail = (session) => __awaiter(this, void 0, void 0, function* () {
            return yield ValidateResgistered_1.ValidacaoCadastro.findOne({ where: { session_usuario: session } });
        });
    }
}
exports.ValidationMobileRepository = ValidationMobileRepository;
