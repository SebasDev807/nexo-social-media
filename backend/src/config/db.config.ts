import mongoose from "mongoose"
import { envs } from "./envs.config";

export const dbConnect = async () => {
    try {
        const { connection } = await mongoose.connect(envs.DATABASE_URL);
        const { host, port, name } = connection;
        console.log(`📊 Database connected to ${host}:${port}:${name}`)
    } catch (error) {
        console.error(`[dbConnect]: ${error}`);
        process.exit(1)
    }
}