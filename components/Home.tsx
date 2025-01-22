import { PrismaClient } from '@prisma/client'
import moment from 'moment';

const prisma = new PrismaClient()

export default async function Home() {

  const allSessions = await prisma.session.findMany()
  console.log(allSessions)

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {allSessions.length > 0?
      <ul>
        {allSessions.map((session) => {
          const timeInSeconds = moment.duration(session.duration,"seconds")
          const hours = Math.floor(timeInSeconds.hours())
          const minutes = Math.floor(timeInSeconds.minutes())
          const date = moment(session.date,"YYYY-MM-DD")
          const newDate = date.format("Do MMMM YYYY")

          return <li key={session.id}>You read {session.topic} for {hours}h {minutes}min on {newDate}</li>
        })}
      </ul>
      :<p>You have no study sessions saved</p>}
    </main>
  );
}
