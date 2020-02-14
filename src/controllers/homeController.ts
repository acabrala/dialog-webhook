import { HelloWelcomeHome } from "../responsesHome/responseWelcomeHome";
import { WelcomeHomeRepository } from "../repositoryHome/WelcomeHomeRepository";
import { ResponseEvent } from "../responsesMobile/responseEvents";
import { ResponseFulfillmentText } from "../responsesMobile/responseFulfillment";
import { ValidationHomeRepository } from "../repositoryHome/ValidationHomeRepository"
import { BilheteHomeRepository } from "../repositoryHome/BilheteRepository";

class homeController {

    verificarIntent = async (req, res, data) => {
        switch (data.intentName) {
            case 'Default Welcome Intent':
                try {

                    const usuario = new WelcomeHomeRepository();
                    const userSession = await usuario.userSession(data);
                    if (userSession) {

                        const resposta = await HelloWelcomeHome()

                        return res.json(resposta)
                    }

                } catch (e) {

                }

            case 'identificacao.cpf':
                try {

                    let cpf = { cpf: req.body.queryResult.parameters['id-cpf'] }
                    const welcome = new WelcomeHomeRepository();

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
                    const welcome = new WelcomeHomeRepository();
                    const updateNome = welcome.userSessionUpdate(nome, data.sessionUser);

                    if (updateNome) {

                        const resEvent = ResponseEvent("identificacao_email_home")
                        return res.json(resEvent)

                    } else {
                        return
                    }

                } catch (e) {

                }

                break;
            case 'identificacao.email.home':
                try {

                    const welcome = new WelcomeHomeRepository()
                    const getUser = await welcome.getDataUser(data.sessionUser)
                    if (getUser) {

                        const email = getUser.dataValues.email;
                        const emailSeparado = email.split('@');
                        const emailFinal = emailSeparado[0].substring(emailSeparado[0].length - 5, emailSeparado[0].length);
                        var randoms = [...Array(3)].map(() =>
                            Math.floor(Math.random() * 99 + 1).toFixed(0)
                        );
                        var posicao = Math.floor(Math.random() * 3 + 0).toFixed(0);
                        let numeroEnviado = randoms[posicao];

                        const tokenEmail = new ValidationHomeRepository();
                        const userToken = await tokenEmail.createTokenMail(data.sessionUser, email, numeroEnviado)
                        if (userToken) {

                            const resText = ResponseFulfillmentText(`Certo enviei um código para o email de final ${emailFinal}, poderia confirmar`)
                            return res.json(resText)
                        }

                    }
                } catch (e) {

                }
                break;

            case `identificacao.email.validacao.home`:
                try {
                    const codigoUser = req.body.queryResult.parameters['id-validacao-home'];

                    if (codigoUser) {
                        const validarUser = new ValidationHomeRepository();
                        const information = await validarUser.getTokenMail(data.sessionUser)
                        if (information) {
                            const tokenGenereted = information.dataValues.token;
                            if (codigoUser === tokenGenereted) {

                                const resposta = ResponseEvent("dados_compra_home");
                                return res.json(resposta)

                            }
                        }
                    }
                } catch (e) {

                }
                break;

            case 'dados.compra.home':
                try {
                    const user = new WelcomeHomeRepository()
                    const getUser = await user.getDataUser(data.sessionUser);
                    if (getUser) {
                        const card = new BilheteHomeRepository();
                        const getCard = await card.getBilheteUser(getUser.dataValues.id)
                        if (getCard) {

                            let cartoes = getCard.map(index => {
                                return index.dataValues.apelido;
                            })

                            if (cartoes) {
                                const resposta = ResponseFulfillmentText(`Quais dos seguintes bilhetes deseja carregar ${cartoes[0]}  ou ${cartoes[1]} ?`)
                                return res.json(resposta)
                            }
                        }

                    }

                } catch (e) {

                }

                break;
            case 'dados.pagamento.home':
                try {
                } catch (e) {

                }

                break;
        }
    }
}

export default homeController;

