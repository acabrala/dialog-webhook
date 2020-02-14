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
const responseWelcome_1 = require("../responsesMobile/responseWelcome");
const WelcomeRepository_1 = require("../repositoryDevices/WelcomeRepository");
const constResponse_1 = require("../const/constResponse");
const responseEvents_1 = require("../responsesMobile/responseEvents");
const responseFulfillment_1 = require("../responsesMobile/responseFulfillment");
const responseEventsParameters_1 = require("../responsesMobile/responseEventsParameters");
const BilheteUnicoRepository_1 = require("../repositoryDevices/BilheteUnicoRepository");
const axios_1 = require("axios");
const responseQuickMobile_1 = require("../responsesMobile/responseQuickMobile");
class SeuSaldoController {
    constructor() {
        this.verifyIntent = (req, res, data) => __awaiter(this, void 0, void 0, function* () {
            switch (data.intentName) {
                case 'Default Welcome Intent':
                    try {
                        const welcome = new WelcomeRepository_1.WelcomeMobileRepository();
                        const userSession = yield welcome.userSession(data);
                        if (userSession) {
                            const responseWelcome = responseWelcome_1.ResponseWelcome();
                            return res.json(responseWelcome);
                        }
                    }
                    catch (e) {
                    }
                    break;
                case 'faq.identificacao':
                    try {
                        const values = Object.values(constResponse_1.faqResponse);
                        return res.json(responseQuickMobile_1.ResponseQuickSeuSaldo("Agora escolha uma opção. ", values));
                    }
                    catch (e) {
                    }
                    break;
                case 'identificacao.cpf':
                    try {
                        let cpf = { cpf: req.body.queryResult.parameters['id-cpf'] };
                        const welcome = new WelcomeRepository_1.WelcomeMobileRepository();
                        const updateCpf = welcome.userSessionUpdate(cpf, data.sessionUser);
                        if (updateCpf) {
                            const resEvent = responseEvents_1.ResponseEvent("identificacao-nome");
                            console.log(resEvent);
                            return res.json(resEvent);
                        }
                    }
                    catch (e) {
                    }
                    break;
                case 'identificacao.nome':
                    try {
                        let nome = { nome: req.body.queryResult.parameters['id-nome'] };
                        const welcome = new WelcomeRepository_1.WelcomeMobileRepository();
                        const updateNome = welcome.userSessionUpdate(nome, data.sessionUser);
                        if (updateNome) {
                            const resEvent = responseEvents_1.ResponseEvent("identificacao-email");
                            console.log(resEvent);
                            return res.json(resEvent);
                        }
                    }
                    catch (e) {
                    }
                    break;
                case 'identificacao.email':
                    try {
                        let email = { email: req.body.queryResult.parameters['id-email'] };
                        console.log(email);
                        const welcome = new WelcomeRepository_1.WelcomeMobileRepository();
                        const updateEmail = yield welcome.userSessionUpdate(email, data.sessionUser);
                        if (updateEmail) {
                            const getDataUser = yield welcome.userSessionGetData(data.sessionUser);
                            if (getDataUser) {
                                const email_user = getDataUser.dataValues.email;
                                const nome_user = getDataUser.dataValues.nome;
                                const cpf_user = getDataUser.dataValues.cpf;
                                const userConfirmed = yield welcome.userGetData(getDataUser.dataValues);
                                if (userConfirmed) {
                                    const email = userConfirmed.dataValues.email;
                                    const nome = userConfirmed.dataValues.nome;
                                    const cpf = userConfirmed.dataValues.cpf;
                                    console.log(email_user, email);
                                    if (email != email_user) {
                                        const respostaFulfillmet = responseFulfillment_1.ResponseFulfillmentText(`Olá ${nome_user}, consta outro email cadastrado com este cpf`);
                                        return res.json(respostaFulfillmet);
                                    }
                                    else if (cpf == "" || cpf == null) {
                                        const respostaParametros = responseEventsParameters_1.ResponseEventParameters("cad_incompleto", {
                                            "id-nome": nome_user,
                                            "id-cpf": cpf_user,
                                            "id-email": email_user
                                        });
                                        return res.json(respostaParametros);
                                    }
                                    else if (cpf != cpf_user) {
                                        const respostaFulfillmet = responseFulfillment_1.ResponseFulfillmentText(`Olá ${nome_user}, consta outro cpf cadastrado com este e-mail`);
                                        return res.json(respostaFulfillmet);
                                    }
                                    else {
                                        console.log('cadastro completo');
                                        const respostaEvento = responseEventsParameters_1.ResponseEventParameters('cad_completo', { "id-nome": nome_user });
                                        return res.json(respostaEvento);
                                    }
                                }
                            }
                        }
                    }
                    catch (e) {
                    }
                    break;
                case 'cad.completo.sim':
                    const respostaEvento = responseEvents_1.ResponseEvent('dados_compra');
                    return res.json(respostaEvento);
                case 'dados.compra':
                    const welcome = new WelcomeRepository_1.WelcomeMobileRepository();
                    const userCpf = yield welcome.userSessionGetData(data.sessionUser);
                    if (userCpf) {
                        let cpf = userCpf.dataValues.cpf;
                        if (cpf) {
                            const user = yield welcome.userGetDataCpf(cpf);
                            if (user) {
                                const id = { id_usuario: user.dataValues.id };
                                const updateUser = yield welcome.userSessionUpdate(id, data.sessionUser);
                                if (updateUser) {
                                    const bilhete = new BilheteUnicoRepository_1.BilheteRepository();
                                    const bilheteUser = yield bilhete.getBilheteUser(id);
                                    let cartoes = bilheteUser.map(index => {
                                        return `${index.dataValues.numero} - ${index.dataValues.apelido}`;
                                    });
                                    console.log(cartoes);
                                    const sugestao = cartoes.map(item => {
                                        return { title: item };
                                    });
                                    sugestao.push({ title: "cadastrar bilhete" });
                                    console.log(Object.values(sugestao));
                                    return res.json(responseQuickMobile_1.ResponseQuickSeuSaldo(`Escolha qual bilhete você deseja carregar`, Object.values(sugestao)));
                                }
                            }
                        }
                    }
                    break;
                case 'dados.pagamento':
                    return res.json(responseQuickMobile_1.ResponseQuickSeuSaldo(`Escolha seu cartão`, [{ title: `5307********8017` },
                        { title: `4830********2652` },
                        { title: `cadastrar cartão` }]));
                case 'dados.compra.valor':
                    return res.json(responseQuickMobile_1.ResponseQuickSeuSaldo(`Selecione ou digite o valor desejado`, [{ title: `R$50` }, { title: `R$20` }, { title: `R$100` }]));
                case 'dados.pagamento.cadastrado':
                    const cartaoCred = req.body.queryResult.parameters["id-cartao"];
                    return res.json(responseEvents_1.ResponseEvent(`pagamento_cvv`));
                case 'dados.pagamento.cadastrado.cvv':
                    let cvv = req.body.queryResult.parameters["id-cvv"];
                    if (cvv === 1) {
                        axios_1.default.get(`https://demo2790047.mockable.io/pedido`).then(result => {
                            if (result) {
                                res.json({
                                    fulfillmentText: `Pedido - ${result.data["numero-pedido"]}`,
                                    fulfillmentMessages: [],
                                    source: "example.com",
                                    payload: {
                                        google: {
                                            expectUserResponse: true,
                                            richResponse: {
                                                items: [
                                                    {
                                                        simpleResponse: {
                                                            textToSpeech: `Pedido - ${result.data["numero-pedido"]}`
                                                        }
                                                    },
                                                    {
                                                        basicCard: {
                                                            title: `status - ${result.data["pedido_status"]}`,
                                                            image: {
                                                                url: "https://d26lpennugtm8s.cloudfront.net/stores/647/423/rte/pg-aprovado.png",
                                                                accessibilityText: "Google Logo"
                                                            },
                                                            imageDisplayOptions: "WHITE"
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                    outputContexts: [],
                                    followupEventInput: {}
                                });
                            }
                        });
                    }
                    break;
                default:
                    return null;
            }
        });
    }
}
exports.SeuSaldoController = SeuSaldoController;
