import { Bilhete } from "../model/Bilhete"
import { Op } from 'sequelize';

export class BilheteHomeRepository {

    getBilheteUser = async (id) => {
        
        return await Bilhete.findAll({where:{[Op.and]: [
            {id_usuario: id},
            {flag_bilhete_unico: true}
        ]}})
    }
}