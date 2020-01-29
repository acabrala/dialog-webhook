import { ResponseWelcome } from "../responsesMobile/responseWelcome";
import { WelcomeMobileRepository } from "../repositoryDevices/WelcomeRepository";
import { faqResponse } from "../const/constResponse";
import { ResponseEvent } from "../responsesMobile/responseEvents";
import { ResponseFulfillmentText } from "../responsesMobile/responseFulfillment";
import { ResponseEventParameters } from "../responsesMobile/responseEventsParameters";
import { BilheteRepository } from "../repositoryDevices/BilheteUnicoRepository";
import axios from 'axios';
import { ResponseQuickSeuSaldo } from "../responsesMobile/responseQuickMobile";

export class SeuSaldoController {

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
                    return res.json(ResponseQuickSeuSaldo("Agora escolha uma opção. ", values));
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
                        console.log(resEvent)
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
                        console.log(resEvent)
                        return res.json(resEvent)

                    }

                } catch (e) {

                }

                break;
            case 'identificacao.email':
                try {
                    let email = { email: req.body.queryResult.parameters['id-email'] }

                    console.log(email)
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

                                console.log(cartoes)

                                const sugestao = cartoes.map(item => {
                                    return { title: item }
                                })

                                sugestao.push({ title: "cadastrar bilhete" });

                                console.log(Object.values(sugestao))

                                return res.json(ResponseQuickSeuSaldo(`Escolha qual bilhete você deseja carregar`, Object.values(sugestao)))

                            }
                        }
                    }
                }

                break;
            case 'dados.pagamento':

                return res.json(ResponseQuickSeuSaldo(`Escolha seu cartão`, [{ title: `5307********8017` },
                { title: `4830********2652` },
                { title: `cadastrar cartão` }]))


            case 'dados.compra.valor':

                return res.json(ResponseQuickSeuSaldo(`Selecione ou digite o valor desejado`, [{ title: `R$50` }, { title: `R$20` }, { title: `R$100` }]))

            case 'dados.pagamento.cadastrado':
                const cartaoCred = req.body.queryResult.parameters["id-cartao"];

                return res.json(ResponseEvent(`pagamento_cvv`))
            case 'dados.pagamento.cadastrado.cvv':
                let cvv = req.body.queryResult.parameters["id-cvv"];

                if (cvv === 1) {
                    axios.get(`https://demo2790047.mockable.io/pedido`).then(result => {
                        if (result) {
                            res.json({
                                fulfillmentText: `Pedido - ${
                                    result.data["numero-pedido"]
                                    }`,
                                fulfillmentMessages: [],
                                source: "example.com",
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