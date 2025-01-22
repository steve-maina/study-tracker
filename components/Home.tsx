import { PrismaClient } from "@prisma/client";
import moment from "moment";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Home() {
  const allSessions = await prisma.session.findMany()

  return (
    <main className="flex flex-col justify-center items-center h-screen">
     {allSessions.length >0? <p>Charts coming soon.<Link href="/view-sessions" className="underline decoration-blue-400 decoration-1 visited:decoration-purple-400">View Sessions in the mean time</Link></p>:<p>You have no study sessions. <Link href="/create-session" className="underline decoration-blue-400 decoration-1 visited:decoration-purple-400">Add one</Link></p>}
     </main>
  );
}
