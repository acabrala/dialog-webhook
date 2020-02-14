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
const express_1 = require("express");
const mobileController_1 = require("../controllers/mobileController");
const homeController_1 = require("../controllers/homeController");
const telegramController_1 = require("../controllers/telegramController");
const seuSaldoController_1 = require("../controllers/seuSaldoController");
const router = express_1.Router();
router.get('/', () => console.log("teste"));
router.post("/chatboot", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const intentName = yield req.body.queryResult.intent.displayName;
    const sessionUser = req.body['session'];
    if (intentName != null) {
        console.log(intentName);
        const payload = {
            intentName: intentName,
            sessionUser: sessionUser
        };
        let origem;
        if (req.body.originalDetectIntentRequest.hasOwnProperty('source')) {
            origem = req.body.originalDetectIntentRequest.source;
        }
        else {
            origem = 'seusaldo';
        }
        if (origem === 'telegram') {
            const telegram = new telegramController_1.TelegramController();
            telegram.verifyIntent(req, res, payload);
        }
        else if (origem === 'google') {
            const propertiesDevices = req.body.originalDetectIntentRequest.payload.surface.capabilities.map(item => item.name).includes('actions.capability.SCREEN_OUTPUT');
            if (propertiesDevices === true) {
                const mobile = new mobileController_1.default();
                mobile.verifyIntent(req, res, payload);
            }
            else {
                const home = new homeController_1.default();
                home.verificarIntent(req, res, payload);
            }
        }
        else if (origem === 'seusaldo') {
            const seuSaldo = new seuSaldoController_1.SeuSaldoController();
            seuSaldo.verifyIntent(req, res, payload);
        }
    }
    else {
        return null;
    }
}));
exports.default = router;
