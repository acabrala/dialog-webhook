import { Bilhete } from "../model/Bilhete"
import { Op } from 'sequelize';

export class BilheteRepository {

    getBilheteUser = async (id) => {
        
        return await Bilhete.findAll({where:{[Op.and]: [
            {id_usuario: id.id_usuario},
            {flag_bilhete_unico: true}
        ]}})
    }

    saveBilheteUSer = async (bu, id_user) => {
        console.log("chagando aqui")
        let payload = {numero: bu, id_usuario: id_user, flag_bilhete_unico: true}
        return await Bilhete.create(payload)
    }

    updateBilhete = async (apelido, id_user) => {''

        console.log(apelido);
        
        
        let payload = {apelido: apelido}
        return await Bilhete.update(payload, {where: {id_usuario: id_user, apelido: null}})

    }
}