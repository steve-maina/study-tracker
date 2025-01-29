import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  schema: "./drizzle/schemas/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials:{
    url:process.env.DATABASE_URL as string
  }
});
