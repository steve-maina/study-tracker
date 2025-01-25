import { PrismaClient, Session } from "@prisma/client";
import moment, { duration } from "moment";

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

export default async function Page() {
  const allSessions = await prisma.session.findMany({
    orderBy: [
      {
        date: "desc",
      },
    ],
  });
  const sortedSessions = getSortedSessions(allSessions, "month");
  if (sortedSessions){
    const summarySessions = getSummaryDuration(sortedSessions["1"])
    console.log(getTimeObject(summarySessions))
  }

  // console.log(getSortedSessions(allSessions, "month"));
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {allSessions.length > 0 ? (
        <ul>
          {allSessions.map((session) => {
            const timeObject = getTimeObject(session.duration)
            // const timeInSeconds = moment.duration(session.duration, "seconds");
            // const hours = Math.floor(timeInSeconds.hours());
            // const minutes = Math.floor(timeInSeconds.minutes());
            const date = moment(session.date, "YYYY-MM-DD");
            const newDate = date.format("Do MMMM YYYY");

            return (
              <li key={session.id}>
                You read {session.topic} for {timeObject.hours}h {timeObject.minutes}min on {newDate}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>You have no study sessions saved</p>
      )}
      <p></p>
    </main>
  );
}
