"use server";
import { db } from "@/drizzle/drizzle-db";
import { sessionTable } from "@/drizzle/schemas/schema";

import { and, asc, eq, gte, lte, sum } from "drizzle-orm";
import moment from "moment";
import { redirect } from "next/navigation";
import Papa from "papaparse";
import { sessions } from "../view-sessions/page";

export default async function formSubmit(prevState: any, formData: FormData) {
  const date = formData.get("day");
  const topic = formData.get("topic");
  const duration = formData.get("duration");
  const startTime = formData.get("start");
  const endTime = formData.get("end");
  const operation = formData.get("operation");
  const formattedDate = date?.toString().replace(/ /gi, "-");
  const recordingEnd = formData.get("recordingEnd");

  if (operation === "create") {
    formattedDate &&
      recordingEnd &&
      topic &&
      duration &&
      (await db.insert(sessionTable).values({
        topic: topic.toString(),
        duration: Number(duration.toString()),
        date: moment(recordingEnd.toString())
          .subtract(Number(duration.toString()), "seconds")
          .toDate(),
      }));
    redirect("/view-sessions");
  } else if (operation === "save") {
    if (formattedDate && topic && startTime && endTime) {
      const startTimeMoment = moment(startTime.toString(), "HH:mm");
      const endTimeMoment = moment(endTime.toString(), "HH:mm");
      const timeElapsed = endTimeMoment.diff(startTimeMoment, "seconds");
      await db.insert(sessionTable).values({
        topic: topic.toString(),
        duration: timeElapsed,
        date: new Date(
          moment(formattedDate).add(startTime.toString(), "hours").toDate()
        ),
      });
      redirect("/view-sessions");
    }
  }
}
export async function getGroupedSessions(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const sessions = db
    .select({ totalTime: sum(sessionTable.duration), date: sessionTable.date })
    .from(sessionTable)
    .where(and(gte(sessionTable.date, start), lte(sessionTable.date, end)))
    .groupBy(sessionTable.date)
    .orderBy(sessionTable.date);
  return sessions;
}
export async function updateChart(startDate: string, endDate: string) {
  const allSessions = await getSessions(startDate, endDate);
  return allSessions;
}
export async function getSessions(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return db
    .select()
    .from(sessionTable)
    .where(and(gte(sessionTable.date, start), lte(sessionTable.date, end)))
    .orderBy(asc(sessionTable.date));
}

export async function exportCSV(startDate: string, endDate: string) {
  const sessions = await getSessions(startDate, endDate);

  const newSessions = sessions.map((session) => {
    const topic = session.topic;
    const duration = session.duration;
    const date = session.date;
    return {
      topic,
      duration,
      date,
    };
  });
  const csvObj = Papa.unparse(newSessions);
  return csvObj;
}

export async function deleteSession(session: sessions) {
  await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
}
