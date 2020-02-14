import { SessionChat } from "../model/SessionChat";
import { User } from "../model/User";
import { Op } from "sequelize";


export class WelcomeMobileRepository {


  userSession = async (user) => {
    
    const verifyUser = await SessionChat.findOne({ where: { session: user.sessionUser } })

    if (verifyUser) {
      return "ja cadastrado"
    } else {
      const payload = { session: user.sessionUser }
      return await SessionChat.create(payload)

    }

  }

  userSessionUpdate = async (user, session) => {
    
    if (user.hasOwnProperty('cpf')) {

      return await SessionChat.update(user, { where: { session: session } });

    } else if (user.hasOwnProperty('nome')) {

      return await SessionChat.update(user, { where: { session: session } })

    } else if (user.hasOwnProperty('email')) {

      return await SessionChat.update(user, { where: { session: session } })
    } else if(user.hasOwnProperty('id_usuario')){
      return await SessionChat.update(user, {where: {session: session}})

    }

  }

  userSessionGetData = async (session) => {

    return await SessionChat.findOne({ where: { session: session } })
  }

  userGetData = async (user) => {

    const payload = {
      cpf: user.cpf,
      email: user.email
    }

    console.log(payload);


    return await User.findOne({where: {[Op.or]: [
                      {email: payload.email},
                      {cpf: payload.cpf}
    ]}})

  }

  userGetDataCpf = async (cpf) => {

    return await User.findOne({where: {cpf: cpf}})

  }

  userUpdateData = async (userCpf, email) => {

    let cpf = {cpf: userCpf}
    return await User.update(cpf, { where:{ email: email}})
  }
}