import * as mongoose from "mongoose";

export class Database {

    private MONGODB_URI: string = "mongodb://localhost:27017/mobilidade?replicaSet=rs0";

    constructor() {
        this.connectMongo();
    }

    async connectMongo() {
        await mongoose.connect(this.MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true
        }).then(() => {
            console.log('sucesso')
        }).catch(() => {
            console.log('erro')
        })

        console.log("MongoDB connected.");
    }

}