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
const SessionChat_1 = require("../model/SessionChat");
const User_1 = require("../model/User");
class WelcomeHomeRepository {
    constructor() {
        this.userSession = (user) => __awaiter(this, void 0, void 0, function* () {
            const verifyUser = yield SessionChat_1.SessionChat.findOne({ where: { session: user.sessionUser } });
            if (verifyUser) {
                return "ja cadastrado";
            }
            else {
                const payload = { session: user.sessionUser };
                return yield SessionChat_1.SessionChat.create(payload);
            }
        });
        this.userSessionUpdate = (user, session) => __awaiter(this, void 0, void 0, function* () {
            if (user.hasOwnProperty('cpf')) {
                return yield SessionChat_1.SessionChat.update(user, { where: { session: session } });
            }
            else if (user.hasOwnProperty('nome')) {
                return yield SessionChat_1.SessionChat.update(user, { where: { session: session } });
            }
        });
        this.getDataUser = (session) => __awaiter(this, void 0, void 0, function* () {
            const userSession = yield SessionChat_1.SessionChat.findOne({ where: { session: session } });
            if (userSession) {
                return yield User_1.User.findOne({ where: { cpf: userSession.dataValues.cpf } });
            }
        });
    }
}
exports.WelcomeHomeRepository = WelcomeHomeRepository;
