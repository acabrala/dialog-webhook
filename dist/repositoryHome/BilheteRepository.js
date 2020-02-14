"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bilhete_1 = require("../model/Bilhete");
const sequelize_1 = require("sequelize");
class BilheteHomeRepository {
    constructor() {
        this.getBilheteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield Bilhete_1.Bilhete.findAll({ where: { [sequelize_1.Op.and]: [
                        { id_usuario: id },
                        { flag_bilhete_unico: true }
                    ] } });
        });
    }
}
exports.BilheteHomeRepository = BilheteHomeRepository;
