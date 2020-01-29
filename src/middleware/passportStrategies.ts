// import * as passport from "passport";
// import * as passportFacebook from "passport-facebook-token";
// import * as passportLocal from "passport-local";
// import * as passportGoogle from "passport-google-token";
// import * as passportTwitter from "passport-twitter-token";
// import * as passportAnonymous from "passport-anonymous"
// import { User } from '../model/User';

// const GoogleStrategy = passportGoogle.Strategy;

// export function initializeFacebookStrategy(passport: passport.PassportStatic): void {

//   passport.use(new passportFacebook({
//     clientID: "281409546125461",
//     clientSecret: 'b3dd51e4bac138b80017ad6cb11c64e9',
//     profileFields: ['id', 'displayName', 'gender', 'photos', 'email'],
//     enableProof: false
//   }, (accessToken: string, refreshToken: string, profile: any, done: Function) => {
//     try {

//       let userEmail = profile.emails[0].value;
//       if (userEmail === 'undefined' || !userEmail) {
//         userEmail = null;
//       }
//       var user = {
//         id_user: profile.id,
//         nome: profile.displayName,
//         email: userEmail
//       }; User.findByPk(profile.id)
//         .then(usuario => {
//           if (usuario) {

//             return done(null, user)
//           }
//           user['is_facebook'] = true;
//           return done(null, user)
//         }).catch(error => {
//           done(error, null)
//         });
//     } catch (e) {
//       done(e, null)
//     }
//   }))
// }

// export function initializeAnonymousStrategy(passport: passport.PassportStatic): void {
//   passport.use(new passportAnonymous())
// }

// export function initializeGoogleStrategy(passport: passport.PassportStatic): void {

//   passport.use(new GoogleStrategy({
//     clientID: "531571128532-rjts9augke49b8475bjp549ot3gjcthi.apps.googleusercontent.com",
//     clientSecret: "bMALXFIt_JqwVru75X8bSivD"
//   }, (accessToken: string, refreshToken: string, profile: any, done: Function) => {
//     try {

//       let user = {
//         id_user: profile.id,
//         nome: profile.displayName,
//         email: profile.emails[0].value
//       };

//       User.findByPk(profile.id)
//         .then(usuario => {
//           if (usuario) {
//             return done(null, user)
//           }
//           user['is_google'] = true;

//           return done(null, user)
//         }).catch(err => {
//           done(err, null)
//         })
//     } catch (e) {
//       done(e, null)

//     }
//   }))
// }

// export function initializeTwitterStrategy(passport: passport.PassportStatic): void {

//   passport.use(new passportTwitter({
//     consumerKey: 'x5pMkNjffN0VezjNlI644un0y',
//     consumerSecret: 'Quydz6eO8etyHnyY1wrBHPbdvDIgT1CzAEwLaP5UyQu70qKZx1',
//   }, (token: string, tokenSecret: string, profile: any, done: Function) => {

//     try {
//       let user = {
//         id_user: profile.id,
//         nome: profile.displayName,
//         email: profile.emails[0].value
//       };

//       User.findById(profile.id)
//         .then(usuario => {
//           if (usuario) {
//             return done(null, user)
//           }
//           user['is_twitter'] = true;
//           return done(null, user)
//         }).catch(err => {
//           done(err, null)
//         })
//     } catch (e) {
//       done(e, null)
//     }
//   }))

// }