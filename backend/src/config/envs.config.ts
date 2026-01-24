import 'dotenv/config'
import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.string(),
    JWT_SECRET: z.string()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error(`[Env] error: \n ${parsedEnv.error}`);
    throw new Error(`[Env] error: \n ${parsedEnv.error}`);
}

console.log("[env] ⚙️ Environment variables successfully loaded");

export const envs = parsedEnv.data;