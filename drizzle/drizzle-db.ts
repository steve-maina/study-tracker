import "dotenv/config"
import { drizzle } from 'drizzle-orm/libsql';
import { sessionTable } from "./schemas/schema";
import moment from "moment";
import { desc } from "drizzle-orm";
import { getGroupedSessions } from "@/app/actions/actions";

export const db = drizzle(process.env.DATABASE_URL as string)
