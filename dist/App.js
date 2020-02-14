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
const express = require("express");
const bodyParser = require("body-parser");
const http_1 = require("http");
const sequelize_1 = require("./db/sequelize");
const passport = require("passport");
// import { initializeStrategies } from './middleware/-initialize'
const Database_1 = require("./db/Database");
const Router_1 = require("./routes/Router");
exports.Passport = passport;
class App {
    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        // this.initializeStrategies();
        this.middleware();
        this.listen();
        this.routes();
        new Database_1.Database();
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_1.sequelize.sync({ force: false });
                this.server.listen(this.port, () => {
                    console.log('Running server on port %s', this.port);
                });
            }
            catch (e) {
                console.log("FATAL ERROR: COULD NOT CONNECT TO DATABASE.");
                console.log("ERROR:" + e);
            }
        });
    }
    createApp() {
        this.app = express();
    }
    config() {
        this.port = process.env.PORT || App.PORT;
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    middleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    routes() {
        this.app.use(Router_1.default);
    }
    // private initializeStrategies(): void {
    //     initializeStrategies(passport)
    // }
    getApp() {
        return this.app;
    }
}
App.PORT = 3010;
exports.App = App;
