
import { BarChart } from "@mui/x-charts";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import Link from "next/link";
import SessionChart from "./Chart";
import { getLatestSessions } from "@/app/lib/assorted";

const prisma = new PrismaClient();

export default async function Home() {
   const[startDate, endDate] = await getLatestSessions()
  // console.log(`start Date: ${startDate}`)
  // console.log(`end Date: ${endDate}`)
//  const allSessions = await prisma.session.groupBy({
//   by:[
//     "date"
//   ],

//     where: {
//       date:{
//         lte:new Date(endDate),
//         gte:new Date(startDate)
        
//       }
//     },
//     orderBy:[
//       {date:"asc"}
//     ],
//     _sum: {
//       duration: true
//     },
//   }
// );
// console.log(allSessions)
// const modifiedSessions = allSessions.map((session)=>{
//   return {totalTime:session._sum.duration ,dayOfWeek:moment(session.date).format("dddd")}
// })
  //console.log(modifiedSessions)
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {/* {allSessions.length >0? <p>Charts coming soon.<Link href="/view-sessions" className="underline decoration-blue-400 decoration-1 visited:decoration-purple-400">View Sessions in the mean time</Link></p>:<p>You have no study sessions. <Link href="/create-session" className="underline decoration-blue-400 decoration-1 visited:decoration-purple-400">Add one</Link></p>} */}
      <SessionChart />
    </main>
  );
}
