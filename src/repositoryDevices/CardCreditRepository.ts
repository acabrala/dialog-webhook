import { CreditCard } from "../model/CardCreditUser"

export class CardCreditRepository {

    saveCreditCart = async (cartao) => {
        
        return await CreditCard.create(cartao)
    }
}