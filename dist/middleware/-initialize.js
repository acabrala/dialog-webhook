// import * as passport from "passport";
// import { Strategy } from "./-index";
// import { User } from '../model/User'
// export function initializeStrategies(passport: passport.PassportStatic): void {
//     passport.serializeUser((user: any, done: Function) => done(null, user.id_user));
//   passport.deserializeUser(async (id: string, done: Function) => {
//     return await User
//     .findByPk(id)
//     .then(account => done(null, account))
//     .catch(err => done(err));
//   });
//     Strategy.initializeFacebookStrategy(passport);
//     Strategy.initializeGoogleStrategy(passport)
//     Strategy.initializeTwitterStrategy(passport)
//     Strategy.initializeAnonymousStrategy(passport)
// }
