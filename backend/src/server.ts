import { authRouter, userRouter, postRouter } from "./routes";
import { dbConnect, envs, corsConfig } from "./config";
import { errorHandler } from "./middlewares";
import express, { Application } from 'express';
import cors from 'cors';

class Server {

    private port: string;
    private app: Application;

    constructor() {
        this.port = envs.PORT;
        this.app = express();
        this.db();
        this.middlewares();
        this.routes();
        this.errorHandlers();
    }

    private async db() {
        await dbConnect();
    }

    private middlewares() {
        this.app.use(cors(corsConfig))
        this.app.use(express.json());
    }

    private routes() {
        this.app.use("/api/v1/user", userRouter);
        this.app.use("/api/v1/auth", authRouter);
        this.app.use("/api/v1/post", postRouter)
    }

    private errorHandlers() {
        this.app.use(errorHandler)
    }

    public start() {
        this.app.listen(this.port, () =>
            console.log(`✅ Server running on port ${this.port}`))
    }
}


export default Server;