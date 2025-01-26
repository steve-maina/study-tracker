"use client"
import ExportDataForm from "@/components/ExportData";
import { Button } from "@mui/material";
import { Prisma, PrismaClient, Session } from "@prisma/client";
import moment, { duration } from "moment";
import { getGroupedSessions, getSessions } from "../actions/actions";
import { useEffect, useRef, useState } from "react";
import { convertToTimeUnit, timeUnit } from "../lib/assorted-c";
import { time } from "console";

const prisma = new PrismaClient();
// async function summaryDuration(unitTime: string) {
//   if (unitTime === "month") {
//     const newSessions = await prisma.session.groupBy({
//       by: ["month"],
//       _sum: {
//         duration: true,
//       },
//     });
//     console.log(newSessions);
//   } else if (unitTime === "year") {
//   } else if (unitTime === "day") {
//   }
// }
function getSummaryDuration(sessions:Array<Session>){
  const total:number = sessions.reduce((accumulator:number,current:Session) =>{
    return accumulator + current.duration
  },0)
  const time = moment.duration(total,"seconds")
  return total

}
type SortedSessions = { [key: number]: Session[] }
function getSortedSessions(sessions: Array<Session>, sortParameter: string) {
  const sortedSessions: SortedSessions= {}
  if (sortParameter === "month") {
    sessions.forEach((session) => {
      if (sortedSessions[session.month]) {
        sortedSessions[session.month].push(session);
      } else {
        sortedSessions[session.month] = [];
        sortedSessions[session.month].push(session);
      }
    });
    return sortedSessions;
  } else if (sortParameter === "year") {
    sessions.forEach((session) => {
      if (sortedSessions[session.year]) {
        sortedSessions[session.year].push(session);
      } else {
        sortedSessions[session.year] = [];
        sortedSessions[session.year].push(session);
      }
    });
    return sortedSessions;
  } else if (sortParameter === "day") {
    sessions.forEach((session) => {
      if (sortedSessions[session.day]) {
        sortedSessions[session.day].push(session);
      } else {
        sortedSessions[session.day] = [];
        sortedSessions[session.day].push(session);
      }
    });
    return sortedSessions;
  }
}
function getTimeObject(duration: number){
  const timeInSeconds = moment.duration(duration, "seconds");
            const hours = Math.floor(timeInSeconds.hours());
            const minutes = Math.floor(timeInSeconds.minutes());
            return {
              hours,
              minutes
            }
}
type grouped =(Prisma.PickEnumerable<Prisma.SessionGroupByOutputType, "date"[]> & {
  _sum: {
      duration: number | null;
  };
})[]

export default function Page() {
  const [timeUnit, setTimeUnit] = useState("minutes")
  const [allSessions,setAllSessions] = useState<Array<Session>>([])
  const [summary,setSummary]= useState(0)
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );
  
  useEffect(() => {
    const fn = async() =>{
      const sessions =  await getSessions(startDate,endDate)
      const summary =   await getGroupedSessions(startDate,endDate)
      setAllSessions(sessions)
      
    const newSummary = summary.reduce((acc, session)=>{
      return session._sum.duration as number + acc
    },0)
    setSummary(newSummary)
    }
    fn()
  },[startDate,endDate]
  )

  // console.log(getSortedSessions(allSessions, "month"));
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {allSessions.length > 0 ? (
        <>
        <ul>
          {allSessions.map((session) => {
            const timeObject = getTimeObject(session.duration)
            // const timeInSeconds = moment.duration(session.duration, "seconds");
            // const hours = Math.floor(timeInSeconds.hours());
            // const minutes = Math.floor(timeInSeconds.minutes());
            const date = moment(session.date, "YYYY-MM-DD");
            const newDate = date.format("Do MMMM YYYY");

            return (
              <li key={session.id} className="border border-black p-4">
                You read {session.topic} for {timeObject.hours}h {timeObject.minutes}min on {newDate}
              </li>
            );
          })}
        </ul>
        <p>Total time Read: {convertToTimeUnit(summary,timeUnit as timeUnit)}</p></>
      ) : (
        <p>You have no study sessions saved</p>
      )}
      <p></p>
      <ExportDataForm setTimeUnit={setTimeUnit } timeUnit={timeUnit} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
    </main>
  );
}
