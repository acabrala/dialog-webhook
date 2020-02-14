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
const responseWelcomeHome_1 = require("../responsesHome/responseWelcomeHome");
const WelcomeHomeRepository_1 = require("../repositoryHome/WelcomeHomeRepository");
const responseEvents_1 = require("../responsesMobile/responseEvents");
const responseFulfillment_1 = require("../responsesMobile/responseFulfillment");
const ValidationHomeRepository_1 = require("../repositoryHome/ValidationHomeRepository");
const BilheteRepository_1 = require("../repositoryHome/BilheteRepository");
class homeController {
    constructor() {
        this.verificarIntent = (req, res, data) => __awaiter(this, void 0, void 0, function* () {
            switch (data.intentName) {
                case 'Default Welcome Intent':
                    try {
                        const usuario = new WelcomeHomeRepository_1.WelcomeHomeRepository();
                        const userSession = yield usuario.userSession(data);
                        if (userSession) {
                            const resposta = yield responseWelcomeHome_1.HelloWelcomeHome();
                            return res.json(resposta);
                        }
                    }
                    catch (e) {
                    }
                case 'identificacao.cpf':
                    try {
                        let cpf = { cpf: req.body.queryResult.parameters['id-cpf'] };
                        const welcome = new WelcomeHomeRepository_1.WelcomeHomeRepository();
                        const updateCpf = welcome.userSessionUpdate(cpf, data.sessionUser);
                        if (updateCpf) {
                            const resEvent = responseEvents_1.ResponseEvent("identificacao-nome");
                            return res.json(resEvent);
                        }
                    }
                    catch (e) {
                    }
                    break;
                case 'identificacao.nome':
                    try {
                        let nome = { nome: req.body.queryResult.parameters['id-nome'] };
                        const welcome = new WelcomeHomeRepository_1.WelcomeHomeRepository();
                        const updateNome = welcome.userSessionUpdate(nome, data.sessionUser);
                        if (updateNome) {
                            const resEvent = responseEvents_1.ResponseEvent("identificacao_email_home");
                            return res.json(resEvent);
                        }
                        else {
                            return;
                        }
                    }
                    catch (e) {
                    }
                    break;
                case 'identificacao.email.home':
                    try {
                        const welcome = new WelcomeHomeRepository_1.WelcomeHomeRepository();
                        const getUser = yield welcome.getDataUser(data.sessionUser);
                        if (getUser) {
                            const email = getUser.dataValues.email;
                            const emailSeparado = email.split('@');
                            const emailFinal = emailSeparado[0].substring(emailSeparado[0].length - 5, emailSeparado[0].length);
                            var randoms = [...Array(3)].map(() => Math.floor(Math.random() * 99 + 1).toFixed(0));
                            var posicao = Math.floor(Math.random() * 3 + 0).toFixed(0);
                            let numeroEnviado = randoms[posicao];
                            const tokenEmail = new ValidationHomeRepository_1.ValidationHomeRepository();
                            const userToken = yield tokenEmail.createTokenMail(data.sessionUser, email, numeroEnviado);
                            if (userToken) {
                                const resText = responseFulfillment_1.ResponseFulfillmentText(`Certo enviei um código para o email de final ${emailFinal}, poderia confirmar`);
                                return res.json(resText);
                            }
                        }
                    }
                    catch (e) {
                    }
                    break;
                case `identificacao.email.validacao.home`:
                    try {
                        const codigoUser = req.body.queryResult.parameters['id-validacao-home'];
                        if (codigoUser) {
                            const validarUser = new ValidationHomeRepository_1.ValidationHomeRepository();
                            const information = yield validarUser.getTokenMail(data.sessionUser);
                            if (information) {
                                const tokenGenereted = information.dataValues.token;
                                if (codigoUser === tokenGenereted) {
                                    const resposta = responseEvents_1.ResponseEvent("dados_compra_home");
                                    return res.json(resposta);
                                }
                            }
                        }
                    }
                    catch (e) {
                    }
                    break;
                case 'dados.compra.home':
                    try {
                        const user = new WelcomeHomeRepository_1.WelcomeHomeRepository();
                        const getUser = yield user.getDataUser(data.sessionUser);
                        if (getUser) {
                            const card = new BilheteRepository_1.BilheteHomeRepository();
                            const getCard = yield card.getBilheteUser(getUser.dataValues.id);
                            if (getCard) {
                                let cartoes = getCard.map(index => {
                                    return index.dataValues.apelido;
                                });
                                if (cartoes) {
                                    const resposta = responseFulfillment_1.ResponseFulfillmentText(`Quais dos seguintes bilhetes deseja carregar ${cartoes[0]}  ou ${cartoes[1]} ?`);
                                    return res.json(resposta);
                                }
                            }
                        }
                    }
                    catch (e) {
                    }
                    break;
                case 'dados.pagamento.home':
                    try {
                    }
                    catch (e) {
                    }
                    break;
            }
        });
    }
}
exports.default = homeController;
