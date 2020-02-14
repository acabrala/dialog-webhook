import { Sequelize } from "sequelize-typescript";
import { SessionChat } from "../model/SessionChat";
import { User } from "../model/User";
import { Bilhete } from "../model/Bilhete";
import { ValidacaoCadastro } from "../model/ValidateResgistered";
import { CreditCard } from "../model/CardCreditUser";


export const sequelize = new Sequelize({
    dialect: "postgres",
    operatorsAliases: Sequelize.Op as any,
    host: "34.70.252.31",
    port: 5432,
    database: "seusaldo_v2",
    username: "postgres",
    password: "MKTz@zz1"
});

sequelize.addModels([SessionChat, User, Bilhete, ValidacaoCadastro, CreditCard]);