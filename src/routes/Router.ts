import { Router } from 'express'
import MobileController from '../controllers/mobileController';
import homeController from '../controllers/homeController';
import { TelegramController } from '../controllers/telegramController';
import { SeuSaldoController } from '../controllers/seuSaldoController';

const router = Router();

router.get('/', () => console.log("teste"));

router.post("/chatboot", async (req, res) => {

    const intentName = await req.body.queryResult.intent.displayName;
    const sessionUser = req.body['session'];

    console.log(intentName);

    if (intentName != null) {

        const payload = {
            intentName: intentName,
            sessionUser: sessionUser
        }

        let origem;

        if (req.body.originalDetectIntentRequest.hasOwnProperty('source')) {
            origem = req.body.originalDetectIntentRequest.source;
        } else {
            origem = 'seusaldo';
        }

        if (origem === 'telegram') {

            const telegram = new TelegramController();
            telegram.verifyIntent(req, res, payload)

        } else if (origem === 'google') {
            const propertiesDevices = req.body.originalDetectIntentRequest.payload.surface.capabilities.map(item => item.name).includes('actions.capability.SCREEN_OUTPUT');
            if (propertiesDevices === true) {

                console.log(payload)
                const mobile = new MobileController()
                mobile.verifyIntent(req, res, payload);
            } else {
                const home = new homeController()
                home.verificarIntent(req, res, payload)
            }
        } else if (origem === 'seusaldo') {

            const seuSaldo = new SeuSaldoController();
            seuSaldo.verifyIntent(req, res, payload);
        }
    } else {
        return null;
    }

});

export default router;
