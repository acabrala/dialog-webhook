"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const SessionChat_1 = require("../model/SessionChat");
const User_1 = require("../model/User");
const Bilhete_1 = require("../model/Bilhete");
const ValidateResgistered_1 = require("../model/ValidateResgistered");
const CardCreditUser_1 = require("../model/CardCreditUser");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    operatorsAliases: sequelize_typescript_1.Sequelize.Op,
    host: "34.70.252.31",
    port: 5432,
    database: "seusaldo_v2",
    username: "postgres",
    password: "MKTz@zz1"
});
exports.sequelize.addModels([SessionChat_1.SessionChat, User_1.User, Bilhete_1.Bilhete, ValidateResgistered_1.ValidacaoCadastro, CardCreditUser_1.CreditCard]);
