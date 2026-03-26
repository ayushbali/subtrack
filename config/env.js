import { config } from "dotenv";
import process from "node:process";
config({ path: `.env${process.env.NODE_ENV || ".development"}.local` });

export const { PORT, NODE_ENV, DB_URL, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_ENV, ARCJET_API_KEY } = process.env;
