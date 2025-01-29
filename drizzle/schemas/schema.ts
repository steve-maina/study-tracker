import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const sessionTable = sqliteTable("session",{
    id:integer().primaryKey({ autoIncrement: true }),
    topic:text().notNull(),
    duration:integer().notNull(),
    date:integer({mode:"timestamp"}).notNull(),
})