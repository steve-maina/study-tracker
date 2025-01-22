"use server";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { redirect } from "next/navigation";

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
          },
        })
        .then(() => prisma.$disconnect());
      redirect("/view-sessions");
    }
  }
}
