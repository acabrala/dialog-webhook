import * as express from 'express'
import * as bodyParser from 'body-parser';
import { Server, createServer } from 'http';
import { sequelize } from "./db/sequelize";
import * as passport from 'passport'
// import { initializeStrategies } from './middleware/-initialize'
import { Database } from './db/Database';
import router from './routes/Router';
export const Passport = passport;

export class App {

    public static readonly PORT: number = 3010;
    private app: express.Application;
    private port: string | number;
    private server: Server;
    public auth;
    private io: SocketIO.Server;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        // this.initializeStrategies();
        this.middleware();
        this.listen();
        this.routes()
        new Database();

    }

    private async listen() {
        try {
            await sequelize.sync({ force: false })

            this.server.listen(this.port, () => {
                console.log('Running server on port %s', this.port);
            });
        } catch (e) {
            console.log("FATAL ERROR: COULD NOT CONNECT TO DATABASE.");
            console.log("ERROR:" + e);
        }
    }

    private createApp(): void {
        this.app = express();
    }

    private config(): void {
        this.port = process.env.PORT || App.PORT;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(passport.initialize())
        this.app.use(passport.session())

    }

    private routes (): void {
        this.app.use(router)
      }


    // private initializeStrategies(): void {
    //     initializeStrategies(passport)
    // }

    public getApp(): express.Application {
        return this.app;
    }
}
