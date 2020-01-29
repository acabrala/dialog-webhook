import { SessionChat } from "../model/SessionChat"
import { User } from "../model/User"

export class WelcomeHomeRepository {
  
  userSession = async(user) => {

    const verifyUser = await SessionChat.findOne({ where: { session: user.sessionUser } })

    if (verifyUser) {
      return "ja cadastrado"
    } else {
      const payload = { session: user.sessionUser }
      return await SessionChat.create(payload)

    }
  }
  userSessionUpdate = async(user, session) => {
    if (user.hasOwnProperty('cpf')) {

      return await SessionChat.update(user, { where: { session: session } });

    } else if (user.hasOwnProperty('nome')) {

      return await SessionChat.update(user, { where: { session: session } })
    }

  }

  getDataUser = async(session) => {
    
    const userSession = await SessionChat.findOne({where: {session: session}})
    
    if(userSession){
      return await User.findOne({where: { cpf: userSession.dataValues.cpf}})
    }
  }

  
}