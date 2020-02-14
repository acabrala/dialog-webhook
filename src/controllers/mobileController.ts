import { ResponseWelcome } from '../responsesMobile/responseWelcome';
import { ResponseQuickDefault } from '../responsesMobile/responseQuickDefault';
import { faqResponse } from '../const/constResponse';
import { WelcomeMobileRepository } from '../repositoryDevices/WelcomeRepository';
import { ResponseEvent } from '../responsesMobile/responseEvents';
import { ResponseEventParameters } from '../responsesMobile/responseEventsParameters';
import { ResponseFulfillmentText } from '../responsesMobile/responseFulfillment';
import { BilheteRepository } from '../repositoryDevices/BilheteUnicoRepository';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';
import { ValidationMobileRepository } from '../repositoryDevices/ValidationMobileRepository';
import { CardCreditRepository } from '../repositoryDevices/CardCreditRepository';

export class MobileController {

    verifyIntent = async (req, res, data) => {

        switch (data.intentName) {
            case 'Default Welcome Intent':
                try {
                    const welcome = new WelcomeMobileRepository();

                    const userSession = await welcome.userSession(data)
                    if (userSession) {

                        const responseWelcome = ResponseWelcome();

                        return res.json(responseWelcome)
                    }

                } catch (e) {

                }

                break;
            case 'faq.identificacao':
                try {

                    const values = Object.values(faqResponse)
                    return res.json(ResponseQuickDefault("Agora escolha uma opção. ", values));
                } catch (e) {

                }
                break;

            case 'identificacao.cpf':
                try {

                    let cpf = { cpf: req.body.queryResult.parameters['id-cpf'] }
                    const welcome = new WelcomeMobileRepository();

                    const updateCpf = welcome.userSessionUpdate(cpf, data.sessionUser)

                    if (updateCpf) {

                        const resEvent = ResponseEvent("identificacao-nome");
                        return res.json(resEvent)
                    }

                } catch (e) {

                }
                break;

            case 'identificacao.nome':
                try {

                    let nome = { nome: req.body.queryResult.parameters['id-nome'] }
                    const welcome = new WelcomeMobileRepository();
                    const updateNome = welcome.userSessionUpdate(nome, data.sessionUser);
                    if (updateNome) {
                        const resEvent = ResponseEvent("identificacao-email")
                        return res.json(resEvent)

                    }

                } catch (e) {

                }

                break;
            case 'identificacao.email':
                try {
                    let email = { email: req.body.queryResult.parameters['id-email'] }

                    const welcome = new WelcomeMobileRepository();
                    const updateEmail = await welcome.userSessionUpdate(email, data.sessionUser)
                    if (updateEmail) {

                        const getDataUser = await welcome.userSessionGetData(data.sessionUser);
                        if (getDataUser) {

                            const email_user = getDataUser.dataValues.email
                            const nome_user = getDataUser.dataValues.nome
                            const cpf_user = getDataUser.dataValues.cpf

                            const userConfirmed = await welcome.userGetData(getDataUser.dataValues)

                            if (userConfirmed) {

                                const email = userConfirmed.dataValues.email
                                const nome = userConfirmed.dataValues.nome
                                const cpf = userConfirmed.dataValues.cpf

                                console.log(email_user, email)
                                if (email != email_user) {
                                    const respostaFulfillmet = ResponseFulfillmentText(`Olá ${nome_user}, consta outro email cadastrado com este cpf`)
                                    return res.json(respostaFulfillmet)
                                } else if (cpf == "" || cpf == null) {

                                    const respostaParametros = ResponseEventParameters("cad_incompleto", {
                                        "id-nome": nome_user,
                                        "id-cpf": cpf_user,
                                        "id-email": email_user
                                    })

                                    return res.json(respostaParametros)

                                } else if (cpf != cpf_user) {

                                    const respostaFulfillmet = ResponseFulfillmentText(`Olá ${nome_user}, consta outro cpf cadastrado com este e-mail`)
                                    return res.json(respostaFulfillmet)

                                } else {
                                    console.log('cadastro completo')
                                    const respostaEvento = ResponseEventParameters('cad_completo', { "id-nome": nome_user })
                                    return res.json(respostaEvento)

                                }
                            }
                        }
                    }
                } catch (e) {

                }

                break;
            case 'cad.completo.sim':

                const respostaEvento = ResponseEvent('dados_compra')
                return res.json(respostaEvento)

            case 'dados.compra':

                const welcome = new WelcomeMobileRepository();

                const userCpf = await welcome.userSessionGetData(data.sessionUser);
                if (userCpf) {

                    let cpf = userCpf.dataValues.cpf
                    if (cpf) {

                        const user = await welcome.userGetDataCpf(cpf)
                        if (user) {

                            const id = { id_usuario: user.dataValues.id };

                            const updateUser = await welcome.userSessionUpdate(id, data.sessionUser)
                            if (updateUser) {
                                const bilhete = new BilheteRepository()
                                const bilheteUser = await bilhete.getBilheteUser(id)

                                let cartoes = bilheteUser.map(index => {
                                    return `${index.dataValues.numero} - ${index.dataValues.apelido}`;
                                })

                                const sugestao = cartoes.map(item => {
                                    return { title: item }
                                })

                                sugestao.push({ title: "cadastrar bilhete" });

                                return res.json(ResponseQuickDefault(`Escolha qual bilhete você deseja carregar`, Object.values(sugestao)))

                            }
                        }
                    }
                }

                break;


            case 'cad.incompleto.sim':
                const usuario = new WelcomeMobileRepository();
                const usuarioDados = await usuario.userSessionGetData(data.sessionUser);

                var randoms = [...Array(3)].map(() =>
                    Math.floor(Math.random() * 99 + 1).toFixed(0)
                );

                const sugestao = randoms.map(item => {
                    return { title: String(item) }
                })
                var posicao = Math.floor(Math.random() * 3 + 0).toFixed(0);
                let numeroEnviado = randoms[posicao];

                if (usuarioDados) {

                    const token = new ValidationMobileRepository();
                    const gerarToekn = await token.createTokenMail(data.sessionUser, usuarioDados.dataValues.email, numeroEnviado);
                    if (gerarToekn) {
                        const resposta = ResponseQuickDefault("Agora escolha uma opção.", sugestao)
                        return res.json(resposta)
                    }

                }

                break;

            case 'cad.incompleto.sim.validacao':
                try {
                    let codeUser = req.body.queryResult.parameters["id-validacao"];
                    const token = new ValidationMobileRepository()
                    const tokenUser = await token.getTokenMail(data.sessionUser)
                    if (tokenUser) {
                        let tokenBd = tokenUser.dataValues.token;

                        if (codeUser === tokenBd) {
                            const user = new WelcomeMobileRepository();
                            const userData = await user.userSessionGetData(data.sessionUser);
                            if (userData) {
                                const email = userData.dataValues.email;
                                const cpf = userData.dataValues.cpf;

                                const userUpdate = await user.userUpdateData(cpf, email)
                                if (userUpdate) {
                                    const resposta = ResponseEvent("dados_compra");
                                    return res.json(resposta)
                                }
                            }
                        }
                    }
                } catch (e) {

                }

                break;

            case 'dados.compra.cadastrar.bilhete':
                try {

                    console.log(req.body.queryResult.parameters);

                    let numberCard = req.body.queryResult.parameters["id-bilhete"];
                    let user = new WelcomeMobileRepository;
                    let userData = await user.userSessionGetData(data.sessionUser);
                    if (userData) {
                        let bu = new BilheteRepository;
                        let saveCard = await bu.saveBilheteUSer(numberCard, userData.dataValues.id_usuario)
                        if (saveCard) {
                            const resposta = ResponseFulfillmentText('Agora dê um apelido para seu bilhete');
                            return res.json(resposta)
                        }
                    }

                } catch (e) {

                }
                break;
            case 'dados.compra.cadastrar.apelido':
                try {
                    let apelido = req.body.queryResult.parameters["id-apelido"];

                    let user = new WelcomeMobileRepository;
                    let userData = await user.userSessionGetData(data.sessionUser);
                    if (userData) {
                        let bu = new BilheteRepository;
                        let updateCard = await bu.updateBilhete(apelido, userData.dataValues.id_usuario)
                        if (updateCard) {
                            console.log('askdajsd');

                        }
                    }

                } catch (e) {

                }
                break;

            case 'dados.pagamento':

                return res.json(ResponseQuickDefault(`Escolha seu cartão`, [{ title: `5307********8017` },
                { title: `4830********2652` },
                { title: `cadastrar cartão` }]))

            case 'dados.compra.valor':

                return res.json(ResponseQuickDefault(`Selecione ou digite o valor desejado`, [{ title: `R$50` }, { title: `R$20` }, { title: `R$100` }]))

            case 'dados.pagamento.cadastrado':
                const cartaoCred = req.body.queryResult.parameters["id-cartao"];

                return res.json(ResponseEvent(`pagamento_cvv`))
            case 'dados.pagamento.numero':
                try {
                    console.log(req.body.queryResult.parameters);

                    const numberCardCredit = req.body.queryResult.parameters['id-nr-cartao'];
                    const numeroCartao = numberCardCredit.toString()
                    const numberCardHidden = await numeroCartao.replace(/(?<=\d{6})\d(?=\d{4})/g, "*");

                    const salt = bcrypt.genSaltSync(15)
                    const hashCard = await bcrypt.hashSync(numeroCartao, salt);

                    let user = new WelcomeMobileRepository;
                    let userData = await user.userSessionGetData(data.sessionUser);
                    if (userData) {
                        let payload = { hash_cartao: hashCard, numero_cartao: numberCardHidden, id_usuario: userData.dataValues.id_usuario }
                        console.log(payload);

                        let creditCard = new CardCreditRepository();
                        let saveCardCredit = await creditCard.saveCreditCart(payload)
                        if (saveCardCredit) {
                            const resposta = ResponseEvent('dados_pagamento_nome');
                            return res.json(resposta)
                        }
                    }

                } catch (e) {

                }
                break;
            case 'dados.pagamento.nome':
                try {

                } catch (e) {

                }
                break;
            case 'dados.pagamento.data':
                try {

                } catch (e) {

                }

                break

            case 'dados.pagamento.cvv':
                try {

                } catch (e) {

                }

                break

            case 'dados.pagamento.cadastrado.cvv':
                let cvv = req.body.queryResult.parameters["id-cvv"];

                if (cvv === 1) {
                    axios.get(`https://demo2790047.mockable.io/pedido`).then(result => {
                        if (result) {
                            res.json({
                                payload: {
                                    google: {
                                        expectUserResponse: true,
                                        richResponse: {
                                            items: [
                                                {
                                                    simpleResponse: {
                                                        textToSpeech: `Pedido - ${
                                                            result.data["numero-pedido"]
                                                            }`
                                                    }
                                                },
                                                {
                                                    basicCard: {
                                                        title: `status - ${result.data["pedido_status"]}`,
                                                        image: {
                                                            url:
                                                                "https://d26lpennugtm8s.cloudfront.net/stores/647/423/rte/pg-aprovado.png",
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
                    })
                }

                break
            default:
                return null;
        }
    }
}

export default MobileController;