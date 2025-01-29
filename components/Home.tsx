import { BarChart } from "@mui/x-charts";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import Link from "next/link";
import SessionChart from "./Chart";
import { getLatestSessions } from "@/app/lib/assorted";
import { db } from "@/drizzle/drizzle-db";
import { sessionTable } from "@/drizzle/schemas/schema";

// const prisma = new PrismaClient();

export default async function Home() {
  
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      
      <SessionChart />
    </main>
  );
}
