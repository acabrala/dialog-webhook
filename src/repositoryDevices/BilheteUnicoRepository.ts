import { Bilhete } from "../model/Bilhete"
import { Op } from 'sequelize';

export class BilheteRepository {

    getBilheteUser = async (id) => {
        
        return await Bilhete.findAll({where:{[Op.and]: [
            {id_usuario: id.id_usuario},
            {flag_bilhete_unico: true}
        ]}})
    }
}