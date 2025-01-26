"use server";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { redirect } from "next/navigation";
import Papa from "papaparse";

const prisma = new PrismaClient();
export default async function formSubmit(prevState: any, formData: FormData) {
  const date = formData.get("day");
  const topic = formData.get("topic");
  const duration = formData.get("duration");
  const startTime = formData.get("start");
  const endTime = formData.get("end");
  const operation = formData.get("operation");
  const formattedDate = date?.toString().replace(/ /gi, "-");

  if (operation === "create") {
    formattedDate &&
      topic &&
      duration &&
      prisma.session
        .create({
          data: {
            topic: topic.toString(),
            duration: Number(duration.toString()),
            date: new Date(formattedDate),
            month: Number(moment(formattedDate).format("M")),
            year: Number(moment(formattedDate).format("YYYY")),
            day: Number(moment(formattedDate).format("D")),
          },
        })
        .then(() => prisma.$disconnect());
    redirect("/view-sessions");
  } else if (operation === "save") {
    if (formattedDate && topic && startTime && endTime) {
      const startTimeMoment = moment(startTime.toString(), "HH:mm");
      const endTimeMoment = moment(endTime.toString(), "HH:mm");
      const timeElapsed = endTimeMoment.diff(startTimeMoment, "seconds");
      prisma.session
        .create({
          data: {
            topic: topic.toString(),
            duration: Number(timeElapsed.toString()),
            date: new Date(formattedDate),
            month: Number(moment(formattedDate).format("M")),
            year: Number(moment(formattedDate).format("YYYY")),
            day: Number(moment(formattedDate).format("D")),
          },
        })
        .then(() => prisma.$disconnect());
      redirect("/view-sessions");
    }
  }
}
export async function getGroupedSessions(startDate: string, endDate: string) {
  const sessions =  await prisma.session.groupBy({
    by:[
      "date"
    ],
      where: {
        date:{
          lte:new Date(endDate),
          gte:new Date(startDate)
        }
      },
      orderBy:[
        {date:"asc"}
      ],
      _sum: {
        duration: true
      },
    }
  );
  return sessions
}
export async function updateChart(startDate: string,endDate: string){
   const allSessions = await getGroupedSessions(startDate, endDate)
  console.log(allSessions)
  const modifiedSessions = allSessions.map((session)=>{
    return {totalTime:session._sum.duration ,dayOfWeek:moment(session.date).format("Do MMM 'YY")}
  })
  return modifiedSessions
}

export async function hello(){
  console.log("hello from server")
  return "hello from client"
}
export async function getSessions(startDate:string,endDate:string){
  return  prisma.session.findMany({
    where:{
      date:{
        lte:new Date(endDate),
        gte:new Date(startDate)
      }
    },
    orderBy:[
      {date:"asc"}
    ]
  })
}

export async function exportCSV(startDate: string,endDate: string){
  const sessions = await getSessions(startDate,endDate)
  console.log(sessions)
  const newSessions = sessions.map((session)=> {
    const topic = session.topic
    const duration = session.duration
    const date = session.date
    return {
      topic,
      duration,
      date
    }
  })
  const csvObj = Papa.unparse(newSessions)
  return csvObj
}
